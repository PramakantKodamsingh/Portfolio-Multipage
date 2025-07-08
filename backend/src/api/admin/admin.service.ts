import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) { }

  async create(dto: CreateAdminDto): Promise<Admin> {
    const existing = await this.adminRepository.findOne({
      where: [{ email: dto.email }, { subdomain: dto.subdomain }],
    });

    if (existing) {
      throw new ConflictException('Admin with email or subdomain already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newAdmin = this.adminRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.adminRepository.save(newAdmin);
  }
  async findBySubdomain(subdomain: string) {
    try {
      return await this.adminRepository.findOne({
        where: { subdomain },
        // relations: ['projects', 'blogs', 'skills', 'experiences'],
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch admin for subdomain: ${subdomain}`);
    }
  }
}
