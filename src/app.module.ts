import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

// 아래 @로 시작하는 모듈을 데코레이터이라고 부른다, 클래스에 함수 기능을 추가하는 기능을 가진다. 클래스 위의 함수이고 클래스를 위해 움직인다.
// Module : 한가지 일을 하는 앱(예로 API 기능이 여러개 있다면, 기능별로 모듈을 만들어도 될 것 같은 느낌!)
// 유저 관련 정보를 처리한다면 user 모듈로 만든다고 보면 됨
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
