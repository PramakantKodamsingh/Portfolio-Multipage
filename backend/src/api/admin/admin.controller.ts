// admin.controller.ts
import { Controller, Get, Req, NotFoundException, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Admin created successfully' })
  @ApiBody({ type: CreateAdminDto })
  async createAdmin(@Body() dto: CreateAdminDto) {
    const admin = await this.adminService.create(dto);
    return {
      message: 'Admin created successfully',
      id: admin.id,
      subdomain: admin.subdomain,
    };
  }
  @Get('admin-profile')
  async getAdminProfile(@Req() req: Request) {
    const subdomain = req['subdomain'];
    console.log(req['subdomain'])
    if (!subdomain) throw new NotFoundException('Subdomain missing');

    const admin = await this.adminService.findBySubdomain(subdomain);
    if (!admin) throw new NotFoundException('Admin not found');

    return {
      name: admin.name,
      email: admin.email,
      // projects: admin.projects,
      // blogs: admin.blogs,
      // skills: admin.skills,
      // experiences: admin.experiences,
    };
  }
}
