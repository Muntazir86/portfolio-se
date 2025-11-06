import { Injectable } from '@nestjs/common';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import * as nodemailer from 'nodemailer';
import { ContactDTO } from 'src/dto/contact.dto';

@Injectable()
export class ContactComService {
    private client: Client;
    isWebAppReady = false;

    constructor() {
        this.client = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: 
            { headless: true,
              args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
              ]
             },
        });

        // When the client is ready, run this code (only once)
        this.client.once('ready', () => {
            console.log('Client is ready!');
            this.isWebAppReady = true;
        });

        // When the client received QR-Code
        this.client.on('qr', (qr) => {
            qrcode.generate(qr, {small: true});
        });

        // Start your client
        this.client.initialize();
    }

    async sendMessageToWhatsapp(phoneNumber: string, message: string): Promise<void> {
      if (!this.isWebAppReady) {
        console.error('WhatsApp Web client is not ready yet. Please try again later.');
        return;
      }
      try {
        // Format phone number to include country code and remove any non-numeric characters
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        const chatId = `${formattedNumber}@c.us`;
        // Send the message
        await this.client.sendMessage(chatId, message);
      } catch (error) {
        console.error(`Failed to send WhatsApp message: ${error.message}`);
        return;
      }
    }

    async sendEmail(contact: ContactDTO): Promise<boolean> {
      // Configure your SMTP transport here
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Portfolio Website" <no-reply@portfolio.com>`,
        to: process.env.EMAIL_TO_CONTACT,
        subject: contact.subject || 'New contact form submission',
        text: `You have a new contact form submission:\n\nName: ${contact.name}\nEmail: ${contact.email}\nSubject: ${contact.subject}\n\nMessage:\n${contact.message}\n\n---\nSent from portfolio website.`,
        html: 
        `<p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${contact.name}</li>
          <li><strong>Email:</strong> ${contact.email}</li>
          <li><strong>Subject:</strong> ${contact.subject}</li>
        </ul>
        <p><strong>Message</strong></p>
        <p>${contact.message?.replace(/\n/g, '<br/>')}</p>
        <hr/><p><small>Sent from portfolio website</small></p>`,
      };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
                                                                                    