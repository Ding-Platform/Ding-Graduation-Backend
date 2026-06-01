import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { logger: false });
    const config = new DocumentBuilder()
      .setTitle('Ding Platform API')
      .setDescription('Complete API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
      
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('swagger-spec.json', JSON.stringify(document, null, 2));
    console.log('Swagger JSON generated at swagger-spec.json');
    await app.close();
    process.exit(0);
  } catch (err) {
    console.error('Failed to generate swagger:', err);
    process.exit(1);
  }
}
bootstrap();
