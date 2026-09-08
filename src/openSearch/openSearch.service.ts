import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpenSearchService implements OnModuleInit {
  private client = new Client({
    node: 'http://localhost:9200',
  });

  private index = 'users';

  async onModuleInit() {
    await this.createIndex();
  }

  async createIndex() {
    const exists = await this.client.indices.exists({
      index: this.index,
    });

    if (!exists.body) {
      await this.client.indices.create({
        index: this.index,
        body: {
          mappings: {
            properties: {
              name: { type: 'text' },
              email: { type: 'keyword' },
              skills: { type: 'text' },
              city: { type: 'keyword' },
            },
          },
        },
      });
    }
  }

  async indexUser(user: any) {
    return this.client.index({
      index: this.index,
      id: user.id.toString(),
      body: user,
      refresh: true,
    });
  }

  async search(query: string) {
    const result = await this.client.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name', 'email', 'skills', 'city'],
            fuzziness: 'AUTO'
          },
        },
      },
    });
    return result.body.hits.hits.map((h: any) => h._source);
  }

  async autocomplete(query: string) {
    const result = await this.client.search({
      index: 'users',
      body: {
        size: 5,
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query,
                  type: 'phrase_prefix',
                  fields: ['name', 'skills']
                }
              },
              {
                match: {
                  city: query
                }
              }
            ]
          }
        }
      }
    });

    return result.body.hits.hits.map((h: any) => h._source);
  }

  async searchWithFilters(query: string, city?: string) {
    const result = await this.client.search({
      index: 'users',
      body: {
        size: 10,
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query,
                  type: 'phrase_prefix',
                  fields: [
                    'name^3',
                    'skills',
                  ],
                },
              },
            ],
            filter: city
              ? [
                {
                  term: {
                    city: city.toLowerCase(),
                  },
                },
              ]
              : [],
          },
        },
      },
    });

    return result.body.hits.hits.map((hit: any) => ({
      score: hit._score,
      ...hit._source,
    }));
  }

  async searchPaginated(query: string, page = 1, limit = 10) {
    const from = (page - 1) * limit;

    try {
      const result = await this.client.search({
        index: this.index,
        from,
        size: limit,
        body: {
          sort: [
            { _score: 'desc' }
          ],
          query: {
            multi_match: {
              query,
              fields: ['name', 'skills', 'city']
            }
          }
        }
      });

      const hits = result.body?.hits?.hits || [];
      const total = typeof result.body?.hits?.total === 'number'
        ? result.body.hits.total
        : result.body?.hits?.total?.value || 0;

      return {
        data: hits.map((h: any) => h._source),
        total,
        page,
        limit
      };
    } catch (error: any) {
      console.error('Search error:', error);
      return {
        data: [],
        total: 0,
        page,
        limit,
        error: error?.message || 'Search failed'
      };
    }
  }
}