import { PaginationParams } from '@app/src/core/model/pagination-params';
import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CurrentUserId } from '@app/src/decorator/current-user-id.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import {
  CreateSavingsDto,
  UpdateSavingsDto,
} from '@app/src/modules/savings/dto/create-savings.dto';
import { SavingsResponse } from '@app/src/modules/savings/dto/savings.dto';
import { SavingsService } from '@app/src/modules/savings/savings.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

@ApiTagController('Savings')
@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Get('total-savings-by-month')
  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Lấy tổng tiền tiết kiệm theo tháng')
  async getTotalSavingsByMonth(
    @Query('monthlyId') monthlyId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.savingsService.getTotalSavingsByMonth(userId, monthlyId);
  }

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách tiết kiệm theo user')
  @UseGuards(HandleAuthGuard)
  @Get()
  async getAll(
    @Pagination() pagination: PaginationParams,
    @CurrentUserId() userId: string,
  ): Promise<SavingsResponse> {
    return this.savingsService.getAll(pagination, userId);
  }

  @Get('monthly')
  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Lấy danh sách tiết kiệm theo tháng')
  async getSavingsByMonth(
    @Query('monthlyId') monthlyId: string,
    @CurrentUserId() userId: string,
  ): Promise<SavingsResponse> {
    return this.savingsService.getSavingsByMonth(userId, monthlyId);
  }

  @ApiCommonResponses('Lấy chi tiết tiết kiệm theo user')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.savingsService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo tiết kiệm theo user')
  @Post()
  async createManufactures(
    @Body() data: CreateSavingsDto,
    @CurrentUserId() userId: string,
  ) {
    return this.savingsService.create(data, userId);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật tiết kiệm theo user')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdateSavingsDto,
  ) {
    return this.savingsService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa tiết kiệm theo user')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.savingsService.delete(id);
  }
}
