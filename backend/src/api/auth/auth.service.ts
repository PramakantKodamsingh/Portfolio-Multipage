import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ResendService } from 'src/shared/resend.service';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class AuthService {
  constructor(private readonly resendService: ResendService) { }

  
}
