import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { Monthly } from '@prisma/client';

export type MonthliesPaginationResponse = PaginationResponse<Monthly>;
