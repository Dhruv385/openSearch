import { OnModuleInit } from '@nestjs/common';
export declare class OpenSearchService implements OnModuleInit {
    private client;
    private index;
    onModuleInit(): Promise<void>;
    createIndex(): Promise<void>;
    indexUser(user: any): Promise<import("@opensearch-project/opensearch/api").Index_Response>;
    search(query: string): Promise<any[]>;
    autocomplete(query: string): Promise<any[]>;
    searchWithFilters(query: string, city?: string): Promise<any[]>;
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
//# sourceMappingURL=openSearch.service.d.ts.map