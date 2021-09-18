import { join } from 'path';
import { env } from '~common/constants';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));

  console.log('Server running');
  await app.listen(env.PORT || 3002);
}
bootstrap();
