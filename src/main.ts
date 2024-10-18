import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from 'dotenv';
import {appConfig} from "./config/app.config";

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the base directory for views and the view engine (HBS - Handlebars)
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Point to the "views" directory
  app.setViewEngine('hbs'); // Set Handlebars as the view engine

  // Serve static assets from the "public" directory (e.g., generated images)
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });
  // Start listening on the port (default is 3000)
  await app.listen(appConfig().port);
}
bootstrap();
