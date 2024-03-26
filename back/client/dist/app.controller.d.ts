import { ClientProxy } from '@nestjs/microservices';
export declare class AppController {
    private client;
    constructor(client: ClientProxy);
    getAllEvents(): import("rxjs").Observable<any>;
}
