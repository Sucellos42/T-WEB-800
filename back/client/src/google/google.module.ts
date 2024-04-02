import { Module } from '@nestjs/common';
import { GoogleStrategy } from '../google.strategy';
import {GoogleService} from "./google.service";
import {GoogleController} from './google.controller';

@Module({
  imports: [],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy],
})
export class GoogleModule {}