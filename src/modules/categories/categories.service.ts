import { PaginationParams } from '@app/src/core/model/pagination-params';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { CategoriesPaginationResponse } from '@app/src/modules/categories/dto/categories.dto';
import { CreateCategoriesDto } from '@app/src/modules/categories/dto/create-categories.dto';
import { UpdateCategoriesDto } from '@app/src/modules/categories/dto/update-categories.dto';
import { PrismaService } from '@app/src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<CategoriesPaginationResponse> {
    const { itemsPerPage, skip, search, page } = pagination;

    const categorys = await this.prismaService.category.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip,
      take: itemsPerPage,
    });

    const total = await this.prismaService.category.count({
      where: {
        name: {
          contains: search,
        },
      },
    });
    return {
      data: categorys,
      total,
      currentPage: page,
      itemsPerPage: itemsPerPage,
    };
  }

  async getById(id: string) {
    return this.prismaService.category.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: CreateCategoriesDto) {
    return this.prismaService.category.create({
      data,
    });
  }

  async update(id: string, data: UpdateCategoriesDto) {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
