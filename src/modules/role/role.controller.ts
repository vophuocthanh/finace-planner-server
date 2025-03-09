import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponses } from 'src/decorator/api-common-responses.decorator';
import { CommonPagination } from 'src/decorator/common-pagination.decorator';
import { HandleAuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateRoleDto } from 'src/modules/role/dto/create.dto';
import { RoleDto } from 'src/modules/role/dto/role.dto';
import { RoleService } from 'src/modules/role/role.service';

@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private rolesService: RoleService) {}

  @ApiCommonResponses('Tạo mới role')
  @Post()
  async createRole(@Body() data: CreateRoleDto) {
    return this.rolesService.createRole(data);
  }

  @UseGuards(HandleAuthGuard)
  @CommonPagination()
  @Get()
  @ApiCommonResponses('Lấy tất cả các role')
  async getRoles(@Query() filter: RoleDto) {
    return this.rolesService.getRoles(filter);
  }

  @UseGuards(HandleAuthGuard)
  @Delete(':id')
  @ApiCommonResponses('Xóa role')
  async deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
