// src/shared/dto/send-email.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'Full name of the person sending the message',
    })
    @IsOptional()
    @IsString()
    name: string;
    
    @ApiProperty({
        example: 'johndoe@gmail.com',
        description: 'Email of the person sending the message',
    })
    @IsEmail()
    from: string;

    @ApiProperty({
        description: 'Subject of the message',
    })
    @IsString()
    subject: string;

    @ApiProperty({
        description: 'Message content from the sender',
    })
    @IsOptional()
    @IsString()
    message: string;
}
