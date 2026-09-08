"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SearchController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
let SearchController = SearchController_1 = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    search(query) {
        return this.searchService.searchUsers(this.requireQuery(query));
    }
    autocomplete(query) {
        return this.searchService.autocomplete(this.requireQuery(query));
    }
    searchWithFilters(query, city) {
        return this.searchService.searchWithFilters(this.requireQuery(query), this.normalizeOptionalQuery(city));
    }
    searchPaginated(query, page, limit) {
        if (page < 1 || limit < 1 || limit > SearchController_1.MAX_PAGE_SIZE) {
            throw new common_1.BadRequestException(`page must be positive and limit must be between 1 and ${SearchController_1.MAX_PAGE_SIZE}`);
        }
        return this.searchService.searchPaginated(this.requireQuery(query), page, limit);
    }
    requireQuery(query) {
        const normalizedQuery = query?.trim();
        if (!normalizedQuery) {
            throw new common_1.BadRequestException('q must not be empty');
        }
        return normalizedQuery;
    }
    normalizeOptionalQuery(query) {
        const normalizedQuery = query?.trim();
        return normalizedQuery || undefined;
    }
};
exports.SearchController = SearchController;
SearchController.MAX_PAGE_SIZE = 100;
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('autocomplete'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "autocomplete", null);
__decorate([
    (0, common_1.Get)('filters'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchWithFilters", null);
__decorate([
    (0, common_1.Get)('paginated'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchPaginated", null);
exports.SearchController = SearchController = SearchController_1 = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map