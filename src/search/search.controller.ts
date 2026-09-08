import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) { }

    @Get('users')
    search(@Query('q') q: string) {
        return this.searchService.searchUsers(q);
    }

    @Get('autocomplete')
    autocomplete(@Query('q') q: string) {
        return this.searchService.autocomplete(q);
    }

    @Get('filters')
    searchWithFilters(
        @Query('q') q: string,
        @Query('city') city?: string
    ) {
        return this.searchService.searchWithFilters(q, city);
    }

    @Get('paginated')
    searchPaginated(
        @Query('q') q: string,
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10'
    ) {
        return this.searchService.searchPaginated(q, parseInt(page), parseInt(limit));
    }
}