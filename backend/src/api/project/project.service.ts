import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) { }

  async create(dto: CreateProjectDto, adminId: string): Promise<Project> {
    try {
      const newProject = this.projectRepository.create({
        ...dto,
        admin: { id: adminId },
      });
      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('Failed to create project: ' + error.message);
    }
  }
  async getAllAdminProjects(adminId: string): Promise<Project[]> {
    try {
      return await this.projectRepository.find({
        where: { admin: { id: adminId } },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch projects: ' + error.message);
    }
  }
  
}