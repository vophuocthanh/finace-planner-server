import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // config swagger api
  const config = new DocumentBuilder()
    .setTitle('Nestjs API')
    .setDescription('The Nestjs API API description')
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
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Swagger | Nestjs API',
  });

  // Configure port on Frontend access side
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  app.enableCors(corsOptions);
  await app.listen(4040);
}

bootstrap();
