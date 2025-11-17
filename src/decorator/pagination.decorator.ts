import { numberConstants } from '@app/src/configs/consts';
import { PaginationParams } from '@app/src/core/model/pagination-params';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest();
    const filters = request.query;

    const itemsPerPage = Number(filters.itemsPerPage) || numberConstants.TEN;
    const page = Number(filters.page) || numberConstants.ONE;
    const search = filters.search || '';
    const skip =
      page > numberConstants.ONE
        ? (page - numberConstants.ONE) * itemsPerPage
        : numberConstants.ZERO;

    return {
      itemsPerPage,
      page,
      skip,
      search,
    };
  },
);
