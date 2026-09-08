import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(body: any): Promise<{
        name: string;
        email: string;
        skills: string;
        city: string;
        id: number;
    }>;
    getUser(page?: string, limit?: string): Promise<{
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
//# sourceMappingURL=user.controller.d.ts.map