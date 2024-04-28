import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'
import {INestMicroservice} from "@nestjs/common";


async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST');
  const microServiceApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: host,
        port: 3001,
      },
    },
  );
  await microServiceApp.listen();
}
bootstrap();
