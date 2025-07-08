import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Admin } from 'src/entities/admin.entity';
import { AdminService } from '../admin/admin.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project,Admin])],
  
  controllers: [ProjectController],
  providers: [ProjectService, AdminService],
  exports: [ProjectService],
})
export class ProjectModule {}
