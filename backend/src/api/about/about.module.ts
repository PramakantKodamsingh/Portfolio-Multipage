import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from 'src/entities/about.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([About]),AdminModule],
  controllers: [AboutController],
  providers: [AboutService],
  exports:[AboutService]
})
export class AboutModule {}
