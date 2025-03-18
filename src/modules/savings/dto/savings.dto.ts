import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { Saving } from '@prisma/client';

export type SavingsResponse = PaginationResponse<Saving>;
