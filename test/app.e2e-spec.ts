import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Test 환경에도 실서버 환경과 똑같이 설정해주어야 한다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // dto 에 설정된 타입과 동일한 타입인지 체크 한다. 파라미터명도 체크를 한다.(지정되지 않는 파라미터명을 쓰면 익셉션)
        forbidNonWhitelisted: true, // whitelist에 포함되지 않는 타입, 파라미터명을 쓰면 알아서 exception을 내고 설명까지 해준다.
        transform: true, // Parameter로 넘어 오는 값을 movie class에 설정된 타입으로 자동 변환해준다.(paramter에 "1"을 넣으면 class에 설정된 값이 Number이면 1로 변환해준다)
      }),
    );

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'AA', year: 2000, genres: ['BB', 'CC'] })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'AA',
          year: 2000,
          genres: ['BB', 'CC'],
          other: 'something',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Patched title' })
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
