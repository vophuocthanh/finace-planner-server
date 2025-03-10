import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { Yearly } from '@prisma/client';

export type YearliesPaginationResponse = PaginationResponse<Yearly>;
