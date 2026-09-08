import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchController } from "./search.controller";
import { OpenSearchModule } from "../openSearch/openSearch.module";


@Module({    
    imports: [OpenSearchModule],
    providers: [SearchService],
    controllers: [SearchController],
})
export class SearchModule {}