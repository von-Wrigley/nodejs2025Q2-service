import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load as loadYaml } from 'js-yaml';
import { readFile } from 'fs/promises';
import 'dotenv/config';
import { JwtAuthGuard } from './auth/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 4000;

  const raw = await readFile('doc/api.yaml', 'utf8');
  const doc = loadYaml(raw) as OpenAPIObject;
  doc.servers = [{ url: `http://localhost:${port}` }];
  SwaggerModule.setup('doc', app, doc, {
    swaggerOptions: {
      persistAuthorization: false,
    },
  });

  await app.listen(port);
}
bootstrap();
