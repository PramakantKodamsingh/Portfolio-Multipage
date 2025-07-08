import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiBody, ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../common/admin.guard';
import { Project } from 'src/entities/project.entity';

@ApiTags('Project')
@Controller('project')
@UseGuards(AdminGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Project created successfully' })
  @ApiBody({ type: CreateProjectDto })
  async createProject(@Request() req: any, @Body() dto: CreateProjectDto) {
    const admin = req['admin'];
    const project = await this.projectService.create(dto, admin.id);
    return {
      message: 'Project created successfully',
      data:{
        id: project.id,
        title: project.title,
      }
    };
  }
  @Get()
  @ApiCreatedResponse({ description: 'Projects fetched successfully', type: [Project], })
  async getProject(@Request() req: any) {
    const admin = req['admin'];
    const projects = await this.projectService.getAllAdminProjects(admin.id);
    return {
      message: 'Project fetched successfully',
      data: projects,
    };
  }
}