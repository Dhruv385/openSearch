import { SearchService } from './search.service';
export declare class SearchController {
    private searchService;
    constructor(searchService: SearchService);
    search(q: string): Promise<any[]>;
    autocomplete(q: string): Promise<any[]>;
    searchWithFilters(q: string, city?: string): Promise<any[]>;
    searchPaginated(q: string, page?: string, limit?: string): Promise<{
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
//# sourceMappingURL=search.controller.d.ts.map