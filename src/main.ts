import { setupSwagger } from '@app/src/configs/swagger.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const API_PREFIX = 'api';
const PORT = 4040;

const CORS_OPTIONS: CorsOptions = {
  // Reflect the request origin to support credentials with "any" origin
  origin: (origin, callback) => {
    // Allow non-browser clients without an Origin header (e.g., curl/Postman)
    if (!origin) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With',
  ],
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(API_PREFIX);
  app.enableCors(CORS_OPTIONS);
  setupSwagger(app);

  await app.listen(PORT);
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
