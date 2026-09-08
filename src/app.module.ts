import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';
import { OpenSearchModule } from './openSearch/openSearch.module';

@Module({
  imports: [UserModule, SearchModule, OpenSearchModule],
})
export class AppModule {}