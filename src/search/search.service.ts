import { Injectable } from '@nestjs/common';
import { OpenSearchService } from '../openSearch/openSearch.service';

@Injectable()
export class SearchService {
    constructor(private readonly openSearch: OpenSearchService) { }

    async searchUsers(query: string): Promise<Awaited<ReturnType<OpenSearchService['search']>>> {
        return this.openSearch.search(query);
    }

    async autocomplete(query: string): Promise<Awaited<ReturnType<OpenSearchService['autocomplete']>>> {
        return this.openSearch.autocomplete(query);
    }

    async searchWithFilters(
        query: string,
        city?: string,
    ): Promise<Awaited<ReturnType<OpenSearchService['searchWithFilters']>>> {
        return this.openSearch.searchWithFilters(query, city);
    }

    async searchPaginated(
        query: string,
        page = 1,
        limit = 10,
    ): Promise<Awaited<ReturnType<OpenSearchService['searchPaginated']>>> {
        return this.openSearch.searchPaginated(query, page, limit);
    }
}