import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [ConfigModule.forRoot(), GoogleModule],
  controllers: [AppController],
  providers: [
    {
      provide: 'EVENTS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('EVENTS_SERVICE_HOST');
        const port = configService.get('EVENTS_SERVICE_PORT');
        console.log(`Connecting to ${host}:${port}`);  // Ajouter ce log
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: host,
            port: port,
          },
        });
      },
    }
  ],
})
export class AppModule {}
