import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { ResendService } from 'src/shared/resend.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly resendService: ResendService) {}


  @Post('send-email')
  async sendEmail(@Body() dto: SendEmailDto) {
    await this.resendService.sendEmail(dto);
    return { message: 'Email sent successfully' };
  }

}
