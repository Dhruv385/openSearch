import { Module } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { OpenSearchService } from "../openSearch/openSearch.service.js";
import { DatabaseModule } from "../database/database.module.js";

@Module({
    imports: [DatabaseModule],
    providers: [UserService, OpenSearchService],
    controllers: [UserController],
})
export class UserModule {}