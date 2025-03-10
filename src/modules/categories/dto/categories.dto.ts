import { PaginationResponse } from '@app/src/core/model/pagination-response';
import { Category } from '@prisma/client';

export type CategoriesPaginationResponse = PaginationResponse<Category>;
