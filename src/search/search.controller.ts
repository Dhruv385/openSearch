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
    constructor(private readonly searchService: SearchService) { }

    @Get('users')
    search(@Query('q') query: string) {
        return this.searchService.searchUsers(this.requireQuery(query));
    }

    @Get('autocomplete')
    autocomplete(@Query('q') query: string) {
        return this.searchService.autocomplete(this.requireQuery(query));
    }

    @Get('filters')
    searchWithFilters(
        @Query('q') query: string,
        @Query('city') city?: string,
    ) {
        return this.searchService.searchWithFilters(
            this.requireQuery(query),
            this.normalizeOptionalQuery(city),
        );
    }

    @Get('paginated')
    searchPaginated(
        @Query('q') query: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ) {
        if (page < 1 || limit < 1) {
            throw new BadRequestException('page and limit must be positive integers');
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