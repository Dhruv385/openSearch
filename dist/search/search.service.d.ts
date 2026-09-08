import { OpenSearchService } from '../openSearch/openSearch.service';
export declare class SearchService {
    private readonly openSearch;
    constructor(openSearch: OpenSearchService);
    searchUsers(query: string): Promise<Awaited<ReturnType<OpenSearchService['search']>>>;
    autocomplete(query: string): Promise<Awaited<ReturnType<OpenSearchService['autocomplete']>>>;
    searchWithFilters(query: string, city?: string): Promise<Awaited<ReturnType<OpenSearchService['searchWithFilters']>>>;
    searchPaginated(query: string, page?: number, limit?: number): Promise<Awaited<ReturnType<OpenSearchService['searchPaginated']>>>;
}
//# sourceMappingURL=search.service.d.ts.map