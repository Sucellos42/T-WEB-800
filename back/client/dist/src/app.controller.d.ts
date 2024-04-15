import { ClientProxy } from '@nestjs/microservices';
export declare class AppController {
    private client;
    constructor(client: ClientProxy);
    getAllEvents(city: string): import("rxjs").Observable<any>;
}
