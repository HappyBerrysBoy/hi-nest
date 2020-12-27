import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto 에 설정된 타입과 동일한 타입인지 체크 한다. 파라미터명도 체크를 한다.(지정되지 않는 파라미터명을 쓰면 익셉션)
      forbidNonWhitelisted: true, // whitelist에 포함되지 않는 타입, 파라미터명을 쓰면 알아서 exception을 내고 설명까지 해준다.
      transform: true, // Parameter로 넘어 오는 값을 movie class에 설정된 타입으로 자동 변환해준다.(paramter에 "1"을 넣으면 class에 설정된 값이 Number이면 1로 변환해준다)
    }),
  );
  await app.listen(3000);
}
bootstrap();
