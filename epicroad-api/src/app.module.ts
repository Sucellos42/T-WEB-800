import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [EventModule, UserModule, GoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
