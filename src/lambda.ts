import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FastifyServerOptions, FastifyInstance, fastify } from 'fastify';
import * as awsLambdaFastify from 'aws-lambda-fastify';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { HttpExceptionFilter } from './config/error/http-exception.filter';
import { useContainer } from 'class-validator';
import { config } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

let cachedNestApp: NestApp;

function swaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle('API nest-serverless-fastify')
    .setDescription(
      'Serverless API in Nestjs using Fastify, with swagger documentation.',
    )
    .setVersion('1.0')
    .build();

  return config;
}

async function bootstrapServer(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (config.app.environment.toUpperCase() !== 'PRD') {
    app.setGlobalPrefix('dev/api/nest-serverless-fastify');
    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup('api/nest-serverless-fastify/docs', app, document);
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api/nest-serverless-fastify');

  await app.init();
  return { app, instance };
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!cachedNestApp) {
    cachedNestApp = await bootstrapServer();
  }
  const proxy = awsLambdaFastify(cachedNestApp.instance);
  return proxy(event, context);
};
