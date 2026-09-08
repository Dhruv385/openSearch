import {
    BadRequestException,
    Controller,
    DefaultValuePipe,
    Get,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    private static readonly MAX_PAGE_SIZE = 100;

    constructor(private readonly searchService: SearchService) { }

    @Get('users')
    search(@Query('q') query: string | undefined) {
        return this.searchService.searchUsers(this.requireQuery(query));
    }

    @Get('autocomplete')
    autocomplete(@Query('q') query: string | undefined) {
        return this.searchService.autocomplete(this.requireQuery(query));
    }

    @Get('filters')
    searchWithFilters(
        @Query('q') query: string | undefined,
        @Query('city') city?: string,
    ) {
        return this.searchService.searchWithFilters(
            this.requireQuery(query),
            this.normalizeOptionalQuery(city),
        );
    }

    @Get('paginated')
    searchPaginated(
        @Query('q') query: string | undefined,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        if (page < 1 || limit < 1 || limit > SearchController.MAX_PAGE_SIZE) {
            throw new BadRequestException(
                `page must be positive and limit must be between 1 and ${SearchController.MAX_PAGE_SIZE}`,
            );
        }

        return this.searchService.searchPaginated(
            this.requireQuery(query),
            page,
            limit,
        );
    }

    private requireQuery(query?: string): string {
        const normalizedQuery = query?.trim();

        if (!normalizedQuery) {
            throw new BadRequestException('q must not be empty');
        }

        return normalizedQuery;
    }

    private normalizeOptionalQuery(query?: string): string | undefined {
        const normalizedQuery = query?.trim();
        return normalizedQuery || undefined;
    }
}