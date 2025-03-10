import { PaginationParams } from '@app/src/core/model/pagination-params';
import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import { CategoriesService } from '@app/src/modules/categories/categories.service';
import { CategoriesPaginationResponse } from '@app/src/modules/categories/dto/categories.dto';
import { CreateCategoriesDto } from '@app/src/modules/categories/dto/create-categories.dto';
import { UpdateCategoriesDto } from '@app/src/modules/categories/dto/update-categories.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@ApiTagController('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách danh mục')
  @Get()
  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<CategoriesPaginationResponse> {
    return this.categoriesService.getAll(pagination);
  }

  @ApiCommonResponses('Lấy chi tiết danh mục')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.categoriesService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo danh mục')
  @Post()
  async createManufactures(@Body() data: CreateCategoriesDto) {
    return this.categoriesService.create(data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật danh mục')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdateCategoriesDto,
  ) {
    return this.categoriesService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa danh mục')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
