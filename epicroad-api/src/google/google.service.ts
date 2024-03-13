import type { OAuthInterface } from '../../interfaces/oAuth.interface';
import type { UserOAuthInterface } from '../../interfaces/userOAuth.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class GoogleService {
  googleLogin(req): OAuthInterface {
    if (!req.user) {
      throw new UnauthorizedException('No user from google');
    }

    const userOAuth: UserOAuthInterface = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
      accessToken: req.user.accessToken,
    };
    
    return {
      message: 'User information from google',
      user: userOAuth,
    };
  }
}
