import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('events')
export class AppController {
  constructor(@Inject('EVENTS_SERVICE') private client: ClientProxy) {}

  @Get()
  getAllEvents() {
    return this.client.send({ cmd: 'get_events' }, {});
  }
}
