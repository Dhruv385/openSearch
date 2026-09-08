"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSearchService = void 0;
const common_1 = require("@nestjs/common");
const opensearch_1 = require("@opensearch-project/opensearch");
let OpenSearchService = class OpenSearchService {
    constructor() {
        this.client = new opensearch_1.Client({
            node: 'http://localhost:9200',
        });
        this.index = 'users';
    }
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
    async indexUser(user) {
        return this.client.index({
            index: this.index,
            id: user.id.toString(),
            body: user,
            refresh: true,
        });
    }
    async search(query) {
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
        return result.body.hits.hits.map((h) => h._source);
    }
    async autocomplete(query) {
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
        return result.body.hits.hits.map((h) => h._source);
    }
    async searchWithFilters(query, city) {
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
        return result.body.hits.hits.map((hit) => ({
            score: hit._score,
            ...hit._source,
        }));
    }
    async searchPaginated(query, page = 1, limit = 10) {
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
                data: hits.map((h) => h._source),
                total,
                page,
                limit
            };
        }
        catch (error) {
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
};
exports.OpenSearchService = OpenSearchService;
exports.OpenSearchService = OpenSearchService = __decorate([
    (0, common_1.Injectable)()
], OpenSearchService);
//# sourceMappingURL=openSearch.service.js.map