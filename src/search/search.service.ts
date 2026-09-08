import { Injectable } from '@nestjs/common';
import { OpenSearchService } from '../openSearch/openSearch.service';

@Injectable()
export class SearchService {
    constructor(private openSearch: OpenSearchService) { }

    async searchUsers(query: string) {
        const result = await this.openSearch.search(query);
        return result;
    }

    async autocomplete(q: string) {
        const result = await this.openSearch.autocomplete(q);
        return result;
    }

    async searchWithFilters(q: string, city?: string) {
        const result = await this.openSearch.searchWithFilters(q, city);
        return result;
    }

    async searchPaginated(query: string, page: number = 1, limit: number = 10) {
        const result = await this.openSearch.searchPaginated(query, page, limit);
        return result;
    }
}