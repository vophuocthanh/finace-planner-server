import { PaginationParams } from '@app/src/core/model/pagination-params';
import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CurrentUserId } from '@app/src/decorator/current-user-id.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import {
  CreateYearliesDto,
  UpdateYearliesDto,
} from '@app/src/modules/yearlies/dto/create-yearlies.dto';
import { YearliesPaginationResponse } from '@app/src/modules/yearlies/dto/yearlies.dto';
import { YearliesService } from '@app/src/modules/yearlies/yearlies.service';
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

@ApiTagController('Year')
@Controller('yearlies')
export class YearliesController {
  constructor(private readonly yearliesService: YearliesService) {}

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách năm')
  @Get()
  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<YearliesPaginationResponse> {
    return this.yearliesService.getAll(pagination);
  }

  @ApiCommonResponses('Lấy chi tiết năm')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.yearliesService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo năm')
  @Post()
  async createManufactures(
    @Body() data: CreateYearliesDto,
    @CurrentUserId() userId: string,
  ) {
    return this.yearliesService.create(data, userId);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật năm')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdateYearliesDto,
  ) {
    return this.yearliesService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa năm')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.yearliesService.delete(id);
  }
}
