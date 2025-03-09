import { ApiTagController } from '@app/src/decorator/common.decorator';
import { MonthliesService } from '@app/src/modules/monthlies/monthlies.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Monthlies')
@Controller('monthlies')
export class MonthliesController {
  constructor(private readonly monthliesService: MonthliesService) {}
}
