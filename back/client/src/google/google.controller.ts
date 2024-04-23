import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import { GoogleService} from "./google.service";
import { AuthGuard } from '@nestjs/passport';
import {OAuthInterface} from "../../interfaces/oAuth.interface";
import { Request, Response } from 'express';
import {ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('OAuth with Google')
@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'This endpoint allows you to authenticate with Google.',
    description: 'This endpoint allows you to authenticate with Google. It operates using the GET method. It redirects you to the Google authentication page.' })
  @ApiOkResponse({ description: 'Google authentication successful. Redirect to home page' })
  @ApiInternalServerErrorResponse({ description: 'Internal error.' })
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: '(Do not use this endpoint directly !) - Redirection endpoint after Google authentication.',
        description: 'This endpoint is used to redirect you to the home page after Google authentication. It operates using the GET method. Do not use this endpoint directly.' })
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