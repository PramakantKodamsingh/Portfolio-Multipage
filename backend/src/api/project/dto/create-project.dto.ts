import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ description: 'The title of the project' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'The description of the project' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'GitHub link for the project', required: false })
    @IsString()
    @IsOptional()
    github_link?: string;

    @ApiProperty({ description: 'URL of the preview image', required: false })
    @IsString()
    @IsOptional()
    previewImage?: string;

    @ApiProperty({ description: 'Live link to the project', required: false })
    @IsString()
    @IsOptional()
    live_link?: string;

    @ApiProperty({ description: 'List of tools used in the project', required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tools?: string[];
}