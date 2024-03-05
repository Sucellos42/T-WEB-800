import { Injectable } from '@nestjs/common';
import { EventInterface } from "./interfaces/event.interface";

@Injectable()
export class EventService {
  events: EventInterface[] = [
    {
      id:1,
      title:"Spectacle",
      place:"Nancy"
    },
    {
      id:2,
      title:"Marché",
      place:"Dijon"
    }
  ];

  getAll(): EventInterface[] {
    return this.events;
  }
}
