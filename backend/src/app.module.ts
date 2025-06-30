import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfiguration from './app.configuration';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';


@Module({
imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    DbModule,
  ],  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
