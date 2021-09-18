import { env } from '~common/constants';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

export default function setupSwagger(app): void {
  interface SwaggerCustomOptions {
    explorer?: boolean;
    swaggerOptions?: Record<string, any>;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customfavIcon?: string;
    swaggerUrl?: string;
    customSiteTitle?: string;
    validatorUrl?: string;
    url?: string;
    urls?: Record<'url' | 'name', string>[];
  }

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    explorer: true,
  };

  const swaggerConfig = new DocumentBuilder()
    .setTitle('KDSP Backend API')
    .setDescription('The KDSP API description')
    .setVersion('1.0')
    .addTag('kdsp')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, customOptions);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(env.PORT || 3002);
  console.log('Server running at: ', env.PORT || 3002);
}
bootstrap();
