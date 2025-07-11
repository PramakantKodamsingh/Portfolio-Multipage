// src/shared/resend.service.ts
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { SendEmailDto } from 'src/api/auth/dto/send-email.dto';

@Injectable()
export class ResendService {
    private resend = new Resend(process.env.RESEND_API_KEY);

    async sendEmail(dto: SendEmailDto): Promise<void> {
        const { name,from, subject, message } = dto;
        const sendername= name?.trim() || 'Anonymous';
        const messageContent =
            (message?.trim().replace(/\n/g, '<br>')) || 'No message provided.';
      
        const html = `
      <div>
        <p><strong>From:</strong> ${from}</p>   
        <p><strong>Name:</strong> ${sendername}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${messageContent}</p>
      </div>
    `;

        try {
            await this.resend.emails.send({
                from: 'Portfolio Contact <onboarding@resend.dev>', // must be verified on Resend
                to: 'pramakantkodamsingh93@gmail.com', // your own receiving address
                subject: `${subject}`,
                replyTo: from,
                html,
            });
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    }
}
