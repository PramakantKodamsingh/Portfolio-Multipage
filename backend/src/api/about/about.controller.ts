import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Request,
  Body,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../../common/admin.guard';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UpdateAboutDto } from './dto/update-about.dto';

@ApiTags('About')
@Controller('about')
@UseGuards(AdminGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profile_image', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
    ]),
  )
  @ApiCreatedResponse({ description: 'About created with uploads' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['github'],
      properties: {
        phone: { type: 'string' },
        address: { type: 'string' },
        github: { type: 'string' },
        linkedIn: { type: 'string' },
        designation: { type: 'string' },
        description: { type: 'string' },
        profile_image: { type: 'string', format: 'binary' },
        resume: { type: 'string', format: 'binary' },
      },
    },
  })
  async create(
    @Request() req: any,
    @Body() body: CreateAboutDto,
    @UploadedFiles() files: {
      profile_image?: Express.Multer.File[];
      resume?: Express.Multer.File[];
    },
  ) {
    const admin = req['admin'];
    const about = await this.aboutService.create(body, admin.id, files);

    return {
      message: 'About created successfully with files',
      data: about,
    };
  }
  @Get()
@ApiCreatedResponse({ description: 'Get current About section' })
async getAbout(@Request() req: any) {
  const admin = req['admin'];
  const about = await this.aboutService.getByAdminId(admin.id);
  return {
    message: 'About fetched successfully',
    data: about,
  };
}
@Put()
@ApiConsumes('multipart/form-data')
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'profile_image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
)
@ApiCreatedResponse({ description: 'About updated with uploads' })
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      phone: { type: 'string' },
      address: { type: 'string' },
      github: { type: 'string' },
      linkedIn: { type: 'string' },
      designation: { type: 'string' },
      description: { type: 'string' },
      profile_image: { type: 'string', format: 'binary' },
      resume: { type: 'string', format: 'binary' },
    },
  },
})
async update(
  @Request() req: any,
  @Body() body: UpdateAboutDto,
  @UploadedFiles() files: {
    profile_image?: Express.Multer.File[];
    resume?: Express.Multer.File[];
  },
) {
  const admin = req['admin'];
  const about = await this.aboutService.update(body, admin.id, files);

  return {
    message: 'About updated successfully',
    data: about,
  };
}
@Delete()
@ApiCreatedResponse({ description: 'About deleted successfully' })
async delete(@Request() req: any) {
  const admin = req['admin'];
  await this.aboutService.delete(admin.id);
  return {
    message: 'About deleted successfully',
  };
}
}

