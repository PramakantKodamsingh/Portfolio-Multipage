import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from 'src/entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UploadService } from 'src/shared/upload.service';
import { UpdateAboutDto } from './dto/update-about.dto';

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
      profile_image?: Express.Multer.File[];
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
    if (files.profile_image?.[0]) {
      const uploaded = await this.uploadService.uploadFile(files.profile_image[0], 'about');
      dto.profile_image = uploaded.secure_url;
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
  async getByAdminId(adminId: string): Promise<About> {
  const about = await this.aboutRepo.findOne({
    where: { admin: { id: adminId }, is_active: true, is_delete: false },
  });

  if (!about) {
    throw new NotFoundException('About section not found');
  }

  return about;
}
async update(
  dto: UpdateAboutDto,
  adminId: string,
  files: {
    profile_image?: Express.Multer.File[];
    resume?: Express.Multer.File[];
  }
): Promise<About> {
  const about = await this.aboutRepo.findOne({
    where: { admin: { id: adminId }, is_active: true, is_delete: false },
  });

  if (!about) {
    throw new NotFoundException('About section not found');
  }

  // Handle file uploads if new files are provided
  if (files.profile_image?.[0]) {
    const uploaded = await this.uploadService.uploadFile(files.profile_image[0], 'about');
    dto.profile_image = uploaded.secure_url;
  }

  if (files.resume?.[0]) {
    const uploaded = await this.uploadService.uploadFile(files.resume[0], 'about');
    dto.resume = uploaded.secure_url;
  }

  Object.assign(about, dto);
  return this.aboutRepo.save(about);
}
async delete(adminId: string): Promise<void> {
  const about = await this.aboutRepo.findOne({
    where: { admin: { id: adminId }, is_active: true, is_delete: false },
  });

  if (!about) {
    throw new NotFoundException('About section not found');
  }
  await this.aboutRepo.remove(about);
}
}

