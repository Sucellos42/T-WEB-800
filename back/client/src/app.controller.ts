import {Controller, Get, Inject, Param} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('events')
export class AppController {
  constructor(@Inject('EVENTS_SERVICE') private client: ClientProxy) {}

  @Get('/bycity/:city')
  getAllEvents(@Param('city') city: string){
    return this.client.send({ cmd: 'get_events' } , city);
  }
}
