import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfiguration from './app.configuration';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { SubdomainMiddleware } from './common/subdomain.middleware';
import { AdminModule } from './api/admin/admin.module';
import { BlogModule } from './api/blog/blog.module';
import { ProjectModule } from './api/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    DbModule,AdminModule,BlogModule,ProjectModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SubdomainMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
