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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const openSearch_service_1 = require("../openSearch/openSearch.service");
let SearchService = class SearchService {
    constructor(openSearch) {
        this.openSearch = openSearch;
    }
    async searchUsers(query) {
        const result = await this.openSearch.search(query);
        return result;
    }
    async autocomplete(q) {
        const result = await this.openSearch.autocomplete(q);
        return result;
    }
    async searchWithFilters(q, city) {
        const result = await this.openSearch.searchWithFilters(q, city);
        return result;
    }
    async searchPaginated(query, page = 1, limit = 10) {
        const result = await this.openSearch.searchPaginated(query, page, limit);
        return result;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [openSearch_service_1.OpenSearchService])
], SearchService);
//# sourceMappingURL=search.service.js.map