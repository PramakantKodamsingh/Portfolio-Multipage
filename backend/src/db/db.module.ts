import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as  ormconfig from './root_orm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
