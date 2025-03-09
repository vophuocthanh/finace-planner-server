import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function ApiTagController(tag: string) {
  return applyDecorators(ApiBearerAuth(), ApiTags(tag));
}
