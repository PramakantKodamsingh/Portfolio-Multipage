import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutDto {
  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'github_username' })
  @IsString()
  githubId: string;

  @ApiPropertyOptional({ example: 'linkedin_username' })
  @IsOptional()
  @IsString()
  linkedinId?: string;

  @ApiPropertyOptional({ example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({ example: 'Full-stack developer with 3+ years.' })
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  resume?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
