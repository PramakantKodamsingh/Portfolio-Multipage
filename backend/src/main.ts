import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import appConfiguration from './app.configuration';
import { useContainer } from 'class-validator';
import * as express from 'express';

async function bootstrap() {
  const config = appConfiguration();
  const port = config.PORT || 8888;

  const app = await NestFactory.create(AppModule);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix(config.API.GLOBAL_PREFIX || 'api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:8080',
        'http://127.0.0.1:8888',
        'http://localhost:8888',
        'http://localhost:3000', 
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (/^http:\/\/[a-zA-Z0-9-]+\.localhost:(8080|3000|8888)$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('My Portfolio API description')
    .setVersion('1.0')
    .addTag('portfolio')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-subdomain',
        in: 'header',
        description: 'Subdomain for the admin (e.g., pramakant)',
      },
      'x-subdomain',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  document.security = [{ 'x-subdomain': [] }];
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, 
      // defaultModelsExpandDepth: 2,
      // defaultModelExpandDepth: 2,
    },
    customSiteTitle: 'Portfolio API Documentation',
  });
    await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}/${config.API.GLOBAL_PREFIX || 'api'}`);
  console.log(`Database connected: ${config.DB.URL}`);
  console.log(`Backend running on port: ${port}`);
  console.log(`Frontend URL: ${config.CLIENT_HOST || 'http://localhost:3000'}`);
}
bootstrap();