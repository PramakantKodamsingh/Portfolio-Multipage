import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import appConfiguration from './app.configuration';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const config = appConfiguration();
  const port = config.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.setGlobalPrefix(config.API.GLOBAL_PREFIX || 'api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true,
  }));
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('My Portfolio API description')
    .setVersion('1.0')
    .addTag('portfolio')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    }, 'bearer')
    .addSecurity('admin', { type: 'apiKey', name: 'admin', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}/${config.API.GLOBAL_PREFIX || 'api'}`);
  console.log(`Database connected: ${config.DB.URL}`);
  console.log(`Backend running on port: ${port}`);
  console.log(`Frontend URL: ${config.CLIENT_HOST || 'http://localhost:3000'}`);
}
bootstrap();
