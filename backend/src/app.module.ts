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
import { AboutModule } from './api/about/about.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    AuthModule,DbModule,AdminModule,BlogModule,ProjectModule,AboutModule, SharedModule
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
