import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from 'src/entities/about.entity';
import { Admin } from 'src/entities/admin.entity';
import { AdminService } from '../admin/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([About,Admin])],
  controllers: [AboutController],
  providers: [AboutService,AdminService],
  exports:[AboutService]
})
export class AboutModule {}
