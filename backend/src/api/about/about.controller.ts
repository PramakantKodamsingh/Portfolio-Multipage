import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AdminGuard } from '../../common/admin.guard';
import { ApiTags, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('About')
@Controller('about')
@UseGuards(AdminGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @ApiCreatedResponse({ description: 'About created successfully' })
  @ApiBody({ type: CreateAboutDto })
  async create(@Request() req: any, @Body() dto: CreateAboutDto) {
    const admin = req['admin'];
    const about = await this.aboutService.create(dto, admin.id);
    return {
      message: 'About created successfully',
      data: about,
    };
  }

  @Put()
  async update(@Request() req: any, @Body() dto: UpdateAboutDto) {
    const admin = req['admin'];
    const about = await this.aboutService.update(dto, admin.id);
    return {
      message: 'About updated successfully',
      data: about,
    };
  }

  @Get()
  async get(@Request() req: any) {
    const admin = req['admin'];
    const about = await this.aboutService.findByAdmin(admin.id);
    return {
      message: 'About fetched successfully',
      data: about,
    };
  }

  @Delete()
  async delete(@Request() req: any) {
    const admin = req['admin'];
    await this.aboutService.delete(admin.id);
    return {
      message: 'About deleted successfully',
    };
  }
}
