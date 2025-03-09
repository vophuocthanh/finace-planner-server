import { ApiTagController } from '@app/src/decorator/common.decorator';
import { ExpensesService } from '@app/src/modules/expenses/expenses.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
}
