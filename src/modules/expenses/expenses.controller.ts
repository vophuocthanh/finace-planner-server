import { PaginationParams } from '@app/src/core/model/pagination-params';
import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CurrentUserId } from '@app/src/decorator/current-user-id.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import {
  CreateExpensesDto,
  UpdateExpensesDto,
} from '@app/src/modules/expenses/dto/create-expenses.dto';
import { ExpensesResponse } from '@app/src/modules/expenses/dto/expenses.dto';
import { ExpensesService } from '@app/src/modules/expenses/expenses.service';
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

@ApiTagController('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('total-expenses-by-month')
  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Lấy tổng tiền chi tiêu theo tháng')
  async getTotalExpensesByMonth(
    @Query('monthlyId') monthlyId: string,
    @CurrentUserId() userId: string,
  ) {
    return this.expensesService.getTotalExpensesByMonth(userId, monthlyId);
  }

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách chi tiêu theo user')
  @UseGuards(HandleAuthGuard)
  @Get()
  async getAll(
    @Pagination() pagination: PaginationParams,
    @CurrentUserId() userId: string,
  ): Promise<ExpensesResponse> {
    return this.expensesService.getAll(pagination, userId);
  }

  @Get('monthly')
  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Lấy danh sách chi tiêu theo tháng')
  async getExpensesByMonth(
    @Query('monthlyId') monthlyId: string,
    @CurrentUserId() userId: string,
  ): Promise<ExpensesResponse> {
    return this.expensesService.getExpensesByMonth(userId, monthlyId);
  }

  @ApiCommonResponses('Lấy chi tiết chi tiêu theo user')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.expensesService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo chi tiêu theo user')
  @Post()
  async createManufactures(
    @Body() data: CreateExpensesDto,
    @CurrentUserId() userId: string,
  ) {
    return this.expensesService.create(data, userId);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật chi tiêu theo user')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdateExpensesDto,
  ) {
    return this.expensesService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa chi tiêu theo user')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.expensesService.delete(id);
  }
}
