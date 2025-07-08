import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from 'src/entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { Admin } from 'src/entities/admin.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepo: Repository<About>,
  ) {}

  async create(dto: CreateAboutDto, adminId: string): Promise<About> {
    const existing = await this.aboutRepo.findOne({ where: { admin: { id: adminId} ,is_delete:false,is_active:true } });

    if (existing) {
      throw new ConflictException('About section already exists for this admin');
    }

    const about = this.aboutRepo.create({
      ...dto,
      admin: { id: adminId } as Admin,
    });

    return this.aboutRepo.save(about);
  }

  async update(dto: UpdateAboutDto, adminId: string): Promise<About> {
    const about = await this.aboutRepo.findOne({ where: { admin: { id: adminId },is_delete:false,is_active:true} });

    if (!about) {
      throw new NotFoundException('About section not found for this admin');
    }

    Object.assign(about, dto);
    return this.aboutRepo.save(about);
  }

async findByAdmin(adminId: string): Promise<About> {
  const about = await this.aboutRepo.findOne({
    where: {
      admin: { id: adminId },
      is_delete: false,
      is_active:true
    },
  });

  if (!about) throw new NotFoundException('About section not found');

  return about;
}


  async delete(adminId: string): Promise<void> {
  const about = await this.aboutRepo.findOne({
    where: { admin: { id: adminId }},
  });

  if (!about) throw new NotFoundException('About section not found');

  await this.aboutRepo.remove(about); 
}
}
