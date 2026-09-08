import { OpenSearchService } from '../openSearch/openSearch.service';
export declare class SearchService {
    private openSearch;
    constructor(openSearch: OpenSearchService);
    searchUsers(query: string): Promise<any[]>;
    autocomplete(q: string): Promise<any[]>;
    searchWithFilters(q: string, city?: string): Promise<any[]>;
    searchPaginated(query: string, page?: number, limit?: number): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
        error?: undefined;
    } | {
        data: never[];
        total: number;
        page: number;
        limit: number;
        error: any;
    }>;
}
//# sourceMappingURL=search.service.d.ts.map