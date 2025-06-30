import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfiguration from './app.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = appConfiguration().PORT;

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
