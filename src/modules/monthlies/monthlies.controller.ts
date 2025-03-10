import { PaginationParams } from '@app/src/core/model/pagination-params';
import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CurrentUserId } from '@app/src/decorator/current-user-id.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import {
  CreateMothilesDto,
  UpdateMothilesDto,
} from '@app/src/modules/monthlies/dto/create-monthlies.dto';
import { MonthliesPaginationResponse } from '@app/src/modules/monthlies/dto/monthlies.dto';
import { MonthliesService } from '@app/src/modules/monthlies/monthlies.service';
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

@ApiTagController('Monthlies')
@Controller('monthlies')
export class MonthliesController {
  constructor(private readonly monthliesService: MonthliesService) {}

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách tháng')
  @Get()
  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<MonthliesPaginationResponse> {
    return this.monthliesService.getAll(pagination);
  }

  @ApiCommonResponses('Lấy chi tiết tháng')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.monthliesService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo tháng')
  @Post()
  async createManufactures(
    @Body() data: CreateMothilesDto,
    @CurrentUserId() userId: string,
  ) {
    return this.monthliesService.create(data, userId);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật tháng')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdateMothilesDto,
  ) {
    return this.monthliesService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa tháng')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.monthliesService.delete(id);
  }
}
