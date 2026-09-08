import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(query: string): Promise<any[]>;
    autocomplete(query: string): Promise<any[]>;
    searchWithFilters(query: string, city?: string): Promise<any[]>;
    searchPaginated(query: string, page: number, limit: number): Promise<{
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