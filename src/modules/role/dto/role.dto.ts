import { Role } from '@prisma/client';

export class RoleDto {
  search?: string;
}

export interface RoleResponseType {
  data: Role[];
  total: number;
}
