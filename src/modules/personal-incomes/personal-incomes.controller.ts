import { ApiCommonResponses } from '@app/src/decorator/api-common-responses.decorator';
import { CommonPagination } from '@app/src/decorator/common-pagination.decorator';
import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CurrentUserId } from '@app/src/decorator/current-user-id.decorator';
import { Pagination } from '@app/src/decorator/pagination.decorator';
import { HandleAuthGuard } from '@app/src/modules/auth/guard/auth.guard';
import {
  CreatePersonIncomeDto,
  UpdatePersonIncomeDto,
} from '@app/src/modules/personal-incomes/dto/create-person-incomes.dto';
import {
  PersonIncomesFilter,
  PersonIncomesResponse,
} from '@app/src/modules/personal-incomes/dto/person-incomes.dto';
import { PersonalIncomesService } from '@app/src/modules/personal-incomes/personal-incomes.service';
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
import { ApiQuery } from '@nestjs/swagger';

@ApiTagController('Personal Incomes')
@Controller('personal-incomes')
export class PersonalIncomesController {
  constructor(
    private readonly personalIncomesService: PersonalIncomesService,
  ) {}

  @CommonPagination()
  @ApiCommonResponses('Lấy danh sách thu nhập cá nhân theo user')
  @ApiQuery({
    name: 'monthName',
    required: false,
    type: String,
    description: 'Tên tháng',
  })
  @UseGuards(HandleAuthGuard)
  @Get()
  async getAll(
    @Pagination() pagination: PersonIncomesFilter,
    @CurrentUserId() userId: string,
  ): Promise<PersonIncomesResponse> {
    return this.personalIncomesService.getAll(pagination, userId);
  }

  @ApiCommonResponses('Lấy chi tiết thu nhập cá nhân theo user')
  @Get(':id')
  async getDetail(@Param('id') id: string) {
    return this.personalIncomesService.getById(id);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Tạo thu nhập cá nhân theo user')
  @Post()
  async createManufactures(
    @Body() data: CreatePersonIncomeDto,
    @CurrentUserId() userId: string,
  ) {
    return this.personalIncomesService.create(data, userId);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Cập nhật thu nhập cá nhân theo user')
  @Put(':id')
  async updateManufactures(
    @Param('id') id: string,
    @Body() data: UpdatePersonIncomeDto,
  ) {
    return this.personalIncomesService.update(id, data);
  }

  @UseGuards(HandleAuthGuard)
  @ApiCommonResponses('Xóa thu nhập cá nhân theo user')
  @Delete(':id')
  async deleteManufactures(@Param('id') id: string) {
    return this.personalIncomesService.delete(id);
  }
}
