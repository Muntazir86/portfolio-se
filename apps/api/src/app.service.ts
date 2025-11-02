import { Injectable } from '@nestjs/common';
import { ContactDTO } from './dto/contact.dto';
import { ApiResponse } from './interfaces/response.model';
import { ContactComService } from './contact-com/contact-com.service';

@Injectable()
export class AppService {
  constructor(private contactComService: ContactComService){}
  getHello(): string {
    return 'Hello World!';
  }

  async contact(contact: ContactDTO): Promise<ApiResponse<string>> {
    const sent = await this.contactComService.sendEmail(contact);
    await this.sendMessageToWhatsapp(contact);
    if (sent) {
      const response: ApiResponse<string> = {
        data: "Thank you for your message! I\'ll get back to you soon.",
        success: true
      };
      return response;
    } else {
      const response: ApiResponse<string> = {
        success: false,
        data: 'Something went wrong. Please try again later.'
      };
      return response;
    }
  }

  async sendMessageToWhatsapp(contactInfo: ContactDTO): Promise<void> {
    const phoneNumber = process.env.WHATSAPP_NUMBER || ''; 
    const message = `New Contact Form Submission\n\nFrom: ${contactInfo.name}\n\nEmail: ${contactInfo.email}\n\nSubject: ${contactInfo.subject}\n\nMessage:\n${contactInfo.message}`;
    await this.contactComService.sendMessageToWhatsapp(phoneNumber, message)
  }
}
