import { ApiTagController } from '@app/src/decorator/common.decorator';
import { PersonalIncomesService } from '@app/src/modules/personal-incomes/personal-incomes.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Personal Incomes')
@Controller('personal-incomes')
export class PersonalIncomesController {
  constructor(
    private readonly personalIncomesService: PersonalIncomesService,
  ) {}
}
