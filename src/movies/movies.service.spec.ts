import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  afterAll(async () => {
    // DB에 데이터를 넣은 경우 말끔히 삭제 해주는 등, 테스트 이후에 처리 할 함수들 입력
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (err) {
        console.log(err.message);
        console.log(`err.message :::: ${err.message}`);
        expect(err).toBeInstanceOf(NotFoundException);
        // expect(err).toEqual(`Movie with ID 999 not found.`);
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      const beforeDeleted = service.getAll().length;
      service.deleteOne(1);

      const afterDelete = service.getAll().length;
      expect(afterDelete).toEqual(beforeDeleted - 1);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update()', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2020,
      });

      service.update(1, { title: 'Updated Test Movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test Movie');
    });

    it('should return a 404', () => {
      try {
        service.update(999, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
