import { Allow, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  // Validation 관련 참조 문서
  // https://github.com/typestack/class-validator

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
