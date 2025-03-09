import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function CommonQuery(name: string, description: string) {
  return applyDecorators(
    ApiQuery({
      name: name,
      required: false,
      enum: ['asc', 'desc'],
      description: description,
    }),
  );
}
