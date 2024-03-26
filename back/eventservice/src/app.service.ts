import { Injectable } from '@nestjs/common';
import { EventInterface } from './interfaces/event.interface';

@Injectable()
export class AppService {
  events: EventInterface[] = [
    {
      id: 1,
      title: 'Spectacle',
      place: 'Nancy',
    },
    {
      id: 2,
      title: 'Marché',
      place: 'Dijon',
    },
  ];
  getEvents(): EventInterface[] {
    return this.events;
  }
}
