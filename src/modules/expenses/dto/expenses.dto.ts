import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { Expense } from '@prisma/client';

export type ExpensesResponse = PaginationResponse<Expense>;
