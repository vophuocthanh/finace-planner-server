import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const APP_TITLE = 'Finance Planner';
const SWAGGER_PATH = 'api';
const API_TAGS = [
  'Auth',
  'Budgets',
  'Categories',
  'Expenses',
  'User',
  'Monthlies',
  'Investments',
  'Personal Incomes',
  'Savings',
  'Role',
  'Year',
];

export const setupSwagger = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(APP_TITLE)
    .setDescription(`${APP_TITLE} API description`)
    .setVersion('1.0')
    .addBearerAuth();

  API_TAGS.forEach((tag) => config.addTag(tag));

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    customSiteTitle: `Swagger | ${APP_TITLE}`,
  });
};
