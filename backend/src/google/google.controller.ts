import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import type { OAuthInterface } from '../../interfaces/oAuth.interface';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth() {}
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const data: OAuthInterface = this.googleService.googleLogin(req);
    const token: string = encodeURIComponent(data.user.accessToken);
    const firstName: string = encodeURIComponent(data.user.firstName);
    const redirectUrl = `${process.env.URL_FRONTEND}?token=${token}&firstName=${firstName}`;
    if (token) {
      res.redirect(redirectUrl);
    }
  }
}
