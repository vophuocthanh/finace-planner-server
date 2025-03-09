import { ApiTagController } from '@app/src/decorator/common.decorator';
import { InvestmentsService } from '@app/src/modules/investments/investments.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Investments')
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}
}
