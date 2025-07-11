import { Module, Global, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ResendService } from './resend.service';

@Global()
@Module({
  providers: [UploadService,ResendService],
  exports: [UploadService,ResendService],
})
export class SharedModule { }
