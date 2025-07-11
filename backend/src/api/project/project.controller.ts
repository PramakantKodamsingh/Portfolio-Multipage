import { Controller, Post, Body, Request, UseGuards, Get, Put, Param, Delete } from '@nestjs/common';
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
@Get(':id')
@ApiCreatedResponse({ description: 'Project fetched successfully', type: Project })
async getProjectById(@Param('id') id: string, @Request() req: any) {
  const admin = req['admin'];
  const project = await this.projectService.getById(id, admin.id);
  return {
    message: 'Project fetched successfully',
    data: project,
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
@Put(':id')
@ApiCreatedResponse({ description: 'Project updated successfully' })
@ApiBody({ type: CreateProjectDto })
async updateProject(
  @Param('id') id: string,
  @Request() req: any,
  @Body() dto: CreateProjectDto,
) {
  const admin = req['admin'];
  const project = await this.projectService.update(id, dto, admin.id);
  return {
    message: 'Project updated successfully',
    data: {
      id: project.id,
      title: project.title,
    },
  };
}
@Delete(':id')
@ApiCreatedResponse({ description: 'Project deleted successfully' })
async deleteProject(@Param('id') id: string, @Request() req: any) {
  const admin = req['admin'];
  await this.projectService.delete(id, admin.id);
  return {
    message: 'Project deleted successfully',
  };
}
}