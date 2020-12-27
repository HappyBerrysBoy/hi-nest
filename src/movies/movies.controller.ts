import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdadteMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Test를 위해서는 jest 모듈을 이용한다.
  // jest는 spec.ts 확장자가 붙어 있는 파일을 테스트 한다.

  // @Req : request 객체, @Res : response 객체를 불러 올 수 있다. 하지만 nestjs에서 권장하는 방식은 아님
  // 왜냐하면 Nestjs는 express, fastify 두가지 프레임웤에 작동가능함, 하지만 @Req, @Res 는 express 에서만 사용되는 방식이기 때문에 이런식으로 코딩을 하면 나중에 웹서버 마이그레이션이 쉽지 않음.
  // 그래서 권장하지 않음
  @Get()
  // getAll(@Req() req, @Res() res): Movie[] {
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  //
  @Get('/search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with a title: search from ${searchingYear}`;
  }

  // Express의 문제점.. 이랄까(?) 위의 get 이후 search와 여기 /:id는 둘다 URL 형태가 동일함.(주소 다음 문자) 그래서 express가 착각을 일으키는듯
  // 해결방법은 :id보다 다른 주소를 상단에 두면 됨.. /search를 /:id보다 소스상 상단위치로 옮기면 해결
  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    console.log(typeof id);
    return this.moviesService.getOne(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    console.log(typeof id);
    return this.moviesService.deleteOne(id);
  }

  // @Put, @Patch
  // @Put : 영화 정보 모든 것을 변경 할때에는 Put
  // @Patch : 영화 정보 일부분을 변경할 때에는 Patch
  // 개인적인 생각.. 이러나 저러나 그냥 업데이트 문 아닌가? 차이점 궁금..! 나중에 봅쉐
  @Patch('/:id')
  patch(@Param('id') id: number, @Body() updateData: UpdadteMovieDto) {
    console.log(`updateData:${updateData.title}`);
    return this.moviesService.update(id, updateData);
  }
}
