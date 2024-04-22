import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import {MessagePattern, Payload} from "@nestjs/microservices";
import { EventInterface } from "./interfaces/event.interface";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: "get_events" })
  async getEventsByCity(city: string): Promise<EventInterface[]> {
    return this.appService.getEventsByCity(city);
  }

  @MessagePattern({ cmd: "get_events_by_type" })
  async getEventsByType(type: Array<string>): Promise<EventInterface[]> {
    return this.appService.getEventsByType(type);
  }

  @MessagePattern({ cmd: "get_events_by_coordinates" })
  async getEventsByCoordinates(
    coordinates: Array<string>
  ): Promise<EventInterface[]> {
    return this.appService.getEventsByCoordinates(coordinates);
  }


  @MessagePattern({ cmd: "get_events_by_city_and_type" })
  async getEventsByCityAndType(
    @Payload() data: { city: string; types: string[] }
  ): Promise<EventInterface[]> {
    const { city, types } = data;
    return this.appService.getEventsByCityAndType(city, types);
  }

  @MessagePattern({ cmd: "get_city" })
  async getCity(): Promise<string[]> {
    return this.appService.getCity();
  }
}
