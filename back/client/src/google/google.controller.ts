import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('google')
export class GoogleController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Get()
  getGoogleAuth() {
    return this.client.send({ cmd: 'get_google_auth' }, {});
  }

  @Get('redirect')
  getGoogleRedirect() {
    return this.client.send({ cmd: 'get_google_redirect' }, {});
  }
}
