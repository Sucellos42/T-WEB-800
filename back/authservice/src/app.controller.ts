import {Controller, Req, Res, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import {OAuthInterface} from '../interfaces/oAuth.interface';
import {Request, Response} from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_google_auth' })
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth() {}

  @MessagePattern({ cmd: 'get_google_redirect' })
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    console.log(req);
    const data: OAuthInterface = this.appService.googleLogin(req);

  }
}
