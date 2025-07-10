import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Request,
  Body,
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

@ApiTags('About')
@Controller('about')
@UseGuards(AdminGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
    ]),
  )
  @ApiCreatedResponse({ description: 'About created with uploads' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['githubId'],
      properties: {
        phone: { type: 'string' },
        githubId: { type: 'string' },
        linkedinId: { type: 'string' },
        designation: { type: 'string' },
        description: { type: 'string' },
        profilePicture: { type: 'string', format: 'binary' },
        resume: { type: 'string', format: 'binary' },
      },
    },
  })
  async create(
    @Request() req: any,
    @Body() body: CreateAboutDto,
    @UploadedFiles() files: {
      profilePicture?: Express.Multer.File[];
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
}

