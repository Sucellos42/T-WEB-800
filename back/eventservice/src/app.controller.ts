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

  @MessagePattern({ cmd: 'get_events_by_type' })
  async getEventsByType(type:Array<string>): Promise<EventInterface[]> {
    return this.appService.getEventsByType(type);
  }

  @MessagePattern({ cmd: 'get_events_by_coordinates' })
  async getEventsByCoordinates(coordinates:Array<string>): Promise<EventInterface[]> {
    return this.appService.getEventsByCoordinates(coordinates);
  }

    @MessagePattern({ cmd: 'get_events_by_city_and_type' })
    async getEventsByCityAndType(city:string, type:Array<string>): Promise<EventInterface[]> {

      let selectedCity = city[0];
      let allType = [];
        for (let i = 0; i < city[1].length; i++) {
            allType.push(city[1][i]);
        }
      console.log(allType)
      return this.appService.getEventsByCityAndType(selectedCity, allType);
    }
}
