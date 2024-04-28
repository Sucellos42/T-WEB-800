import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    },
  )
    const options = new DocumentBuilder()
    .setTitle('Epic-Road API')
    .setDescription('API for the Epic-Road project')
    .setVersion('1.0')
    .addTag('Events')
    .addTag('OAuth with Google')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('apidocs', app, document);

  await app.listen(3000);
}
bootstrap();
