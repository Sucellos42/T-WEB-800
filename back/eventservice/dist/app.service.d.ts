import { EventInterface } from './interfaces/event.interface';
export declare class AppService {
    getEventsByCity(city: string): Promise<EventInterface[]>;
}
