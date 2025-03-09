import { ApiTagController } from '@app/src/decorator/common.decorator';
import { CategoriesService } from '@app/src/modules/categories/categories.service';
import { Controller } from '@nestjs/common';

@ApiTagController('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
}
