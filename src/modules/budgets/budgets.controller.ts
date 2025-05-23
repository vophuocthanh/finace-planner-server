import { PaginationParams } from '@app/src/core/model/pagination-params';
import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CurrentUserId } from '@app/src/decorator/current-user-id.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import { BudgetsService } from '@app/src/modules/budgets/budgets.service';
import { BudgetsPaginationResponse } from '@app/src/modules/budgets/dto/budgets.dto';
import {
  CreateBudgetsDto,
  UpdateBudgetsDto,
} from '@app/src/modules/budgets/dto/create-budgets.dto';
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

@ApiTagController('Budgets')
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách ngân sách')
  @Get()
  async getAll(
    @Pagination() pagination: PaginationParams,
  ): Promise<BudgetsPaginationResponse> {
    return this.budgetsService.getAll(pagination);
  }

  @ApiCommonResponses('Lấy chi tiết ngân sách')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.budgetsService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo ngân sách')
  @Post()
  async createManufactures(
    @Body() data: CreateBudgetsDto,
    @CurrentUserId() userId: string,
  ) {
    return this.budgetsService.create(data, userId);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật ngân sách')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdateBudgetsDto,
  ) {
    return this.budgetsService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa ngân sách')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.budgetsService.delete(id);
  }
}
