// create-admin.dto.ts
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'your-subdomain' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9-]{1,63}$/)
    subdomain: string;
}
  