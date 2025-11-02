import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDTO } from './dto/contact.dto';
import { ApiResponse } from './interfaces/response.model';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("contact")
  async contact(@Body() contact: ContactDTO):Promise<ApiResponse<string>> {
    return await this.appService.contact(contact);
  }
}
