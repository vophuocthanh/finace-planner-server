import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'src/types/users';

/**
 * Decorator to extract the current user ID from the request
 * @param data - Unused parameter required by decorator interface
 * @param ctx - Execution context containing the request
 * @returns The ID of the authenticated user
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user?.id) {
      throw new Error('User ID not found in request');
    }

    return request.user.id;
  },
);
