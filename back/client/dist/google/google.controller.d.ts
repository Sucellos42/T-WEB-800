import { ClientProxy } from '@nestjs/microservices';
export declare class GoogleController {
    private client;
    constructor(client: ClientProxy);
    getGoogleAuth(): import("rxjs").Observable<any>;
    getGoogleRedirect(): import("rxjs").Observable<any>;
}
