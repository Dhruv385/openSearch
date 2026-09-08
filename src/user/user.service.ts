import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { OpenSearchService } from '../openSearch/openSearch.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private openSearch: OpenSearchService,
  ) {}

  async createUser(data: any) {
    const user = await this.prisma.user.create({ data });

    // sync to OpenSearch
    await this.openSearch.indexUser(user);

    return user;
  }

  async getUser(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      total,
      page,
      limit,
    };
  }
}