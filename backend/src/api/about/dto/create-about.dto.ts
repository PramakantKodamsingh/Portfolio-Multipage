import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutDto {
  @ApiPropertyOptional({
    example: '+91 9876543210',
    description: 'Phone number with country code',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Bhubaneswar, Odisha, India',
    description: 'Your city and state',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'https://github.com/pramakant',
    description: 'Full GitHub profile link',
  })
  @IsString()
  github: string;

  @ApiPropertyOptional({
    example: 'https://www.linkedin.com/in/pramakant/',
    description: 'Full LinkedIn profile URL',
  })
  @IsOptional()
  @IsString()
  linkedIn?: string;

  @ApiPropertyOptional({
    example: 'Full Stack Developer',
    description: 'Current job title or role',
  })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({
    example:
      'Experienced developer with a passion for building scalable web applications.',
    description: 'Short professional summary',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/raw/upload/v1690000000/resume.pdf',
    description: 'URL to uploaded resume',
  })
  @IsOptional()
  @IsString()
  resume?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/v1690000000/profile.jpg',
    description: 'URL to uploaded profile image',
  })
  @IsOptional()
  @IsString()
  profile_image?: string;
}
