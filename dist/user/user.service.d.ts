import { PrismaService } from '../database/prisma.service';
import { OpenSearchService } from '../openSearch/openSearch.service';
export declare class UserService {
    private prisma;
    private openSearch;
    constructor(prisma: PrismaService, openSearch: OpenSearchService);
    createUser(data: any): Promise<{
        name: string;
        email: string;
        skills: string;
        city: string;
        id: number;
    }>;
    getUser(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            email: string;
            skills: string;
            city: string;
            id: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map