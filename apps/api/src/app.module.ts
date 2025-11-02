import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactComService } from './contact-com/contact-com.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: process.env.THROTTLE_TTL ? parseInt(process.env.THROTTLE_TTL) : 60,
        limit: process.env.THROTTLE_LIMIT ? parseInt(process.env.THROTTLE_LIMIT) : 30,
      }]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ContactComService],
})
export class AppModule {}
