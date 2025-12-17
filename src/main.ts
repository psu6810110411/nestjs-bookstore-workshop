import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ตั้งค่าให้ทุก API ต้องขึ้นต้นด้วย /api
  app.setGlobalPrefix('api');
  
  // เปิดใช้งาน Validation (ตรวจสอบ DTO อัตโนมัติ)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ตัด field ส่วนเกินออก
    forbidNonWhitelisted: true, // แจ้ง error ถ้ามี field เกิน
  }));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();