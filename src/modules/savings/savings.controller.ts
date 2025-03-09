import { ApiTagController } from '@app/src/decorator/common.decorator';
import { SavingsService } from '@app/src/modules/savings/savings.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Savings')
@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}
}
