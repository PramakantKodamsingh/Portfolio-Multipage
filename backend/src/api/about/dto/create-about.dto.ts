import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutDto {

  @ApiPropertyOptional({ example: '+919876543210', description: 'Phone number of the admin' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'github_username', description: 'GitHub ID or username' })
  @IsString()
  githubId: string;

  @ApiPropertyOptional({ example: 'linkedin_username', description: 'LinkedIn ID or profile' })
  @IsOptional()
  @IsString()
  linkedinId?: string;

  @ApiPropertyOptional({ example: 'https://example.com/resume.pdf', description: 'Resume URL' })
  @IsOptional()
  @IsString()
  resume?: string;

  @ApiPropertyOptional({ example: 'https://example.com/profile.jpg', description: 'Profile picture URL' })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @ApiPropertyOptional({ example: 'Full-stack developer with 3+ years experience.', description: 'Short description/bio' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Software Engineer', description: 'Professional designation' })
  @IsOptional()
  @IsString()
  designation?: string;
}
