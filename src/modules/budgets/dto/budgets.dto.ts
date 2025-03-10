import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { Budget } from '@prisma/client';

export type BudgetsPaginationResponse = PaginationResponse<Budget>;
