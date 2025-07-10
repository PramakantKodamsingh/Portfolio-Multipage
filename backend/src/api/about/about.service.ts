import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from 'src/entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UploadService } from 'src/shared/upload.service';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepo: Repository<About>,
    private readonly uploadService: UploadService
  ) { }

  async create(
    dto: CreateAboutDto,
    adminId: string,
    files: {
      profilePicture?: Express.Multer.File[];
      resume?: Express.Multer.File[];
    }
  ): Promise<About> {
    const existing = await this.aboutRepo.findOne({
      where: { admin: { id: adminId }, is_active: true, is_delete: false },
    });

    if (existing) {
      throw new ConflictException('About section already exists for this admin');
    }

    // Upload files if available
    if (files.profilePicture?.[0]) {
      const uploaded = await this.uploadService.uploadFile(files.profilePicture[0], 'about');
      dto.profilePicture = uploaded.secure_url;
    }

    if (files.resume?.[0]) {
      const uploaded = await this.uploadService.uploadFile(files.resume[0], 'about');
      dto.resume = uploaded.secure_url;
    }

    const about = this.aboutRepo.create({
      ...dto,
      admin: { id: adminId },
    });

    return this.aboutRepo.save(about);
  }
}

