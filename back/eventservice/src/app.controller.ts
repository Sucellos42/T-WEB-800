import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { EventInterface } from './interfaces/event.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_events' })
  async getEventsByCity(city:string): Promise<EventInterface[]> {
    return this.appService.getEventsByCity(city);
  }
}
