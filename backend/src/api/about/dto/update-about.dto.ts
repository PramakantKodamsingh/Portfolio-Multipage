import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAboutDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional()
    @IsOptional()
    github?: string;

    @ApiPropertyOptional()
    @IsOptional()
    linkedIn?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    designation?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    resume?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    profile_image?: string;
}
