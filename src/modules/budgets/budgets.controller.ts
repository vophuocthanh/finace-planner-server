import { ApiTagController } from '@app/src/decorator/common.decorator';
import { BudgetsService } from '@app/src/modules/budgets/budgets.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Budgets')
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}
}
