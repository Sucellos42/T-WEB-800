import { AppService } from './app.service';
import { EventInterface } from './interfaces/event.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getEventsByCity(city: string): Promise<EventInterface[]>;
}
