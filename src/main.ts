import { loadingConfigRepo } from '@config/config-repo/bootstrap';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  await loadingConfigRepo();

  const adapter = new FastifyAdapter({ logger: true });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '/management/health/liveness', method: RequestMethod.GET },
      { path: '/management/health/readiness', method: RequestMethod.GET },
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('BFF - Arquitetura de Referência')
    .setDescription('App exemplo com arquitetura de referência')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        bearerFormat: 'JWT',
        description: 'Token de Autorização',
        scheme: 'Bearer',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = parseInt(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
