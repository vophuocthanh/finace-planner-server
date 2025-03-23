import { PaginationParams } from '@app/src/core/model/pagination-params';
import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { PersonalIncome } from '@prisma/client';

export type PersonIncomesResponse = PaginationResponse<PersonalIncome>;

export interface PersonIncomesFilter extends PaginationParams {
  monthName?: string;
}
