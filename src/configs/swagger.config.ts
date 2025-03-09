import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const APP_TITLE = 'Finance Planner';
const SWAGGER_PATH = 'api';

export const setupSwagger = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle(APP_TITLE)
    .setDescription(`${APP_TITLE} API description`)
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Budgets')
    .addTag('Categories')
    .addTag('Expenses')
    .addTag('User')
    .addTag('Monthlies')
    .addTag('Investments')
    .addTag('Personal Incomes')
    .addTag('Savings')
    .addTag('Role')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    customSiteTitle: `Swagger | ${APP_TITLE}`,
  });
};
