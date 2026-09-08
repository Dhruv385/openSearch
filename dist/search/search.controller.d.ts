import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    private static readonly MAX_PAGE_SIZE;
    constructor(searchService: SearchService);
    search(query: string | undefined): Promise<any[]>;
    autocomplete(query: string | undefined): Promise<any[]>;
    searchWithFilters(query: string | undefined, city?: string): Promise<any[]>;
    searchPaginated(query: string | undefined, page: number, limit: number): Promise<{
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
    private requireQuery;
    private normalizeOptionalQuery;
}
//# sourceMappingURL=search.controller.d.ts.map