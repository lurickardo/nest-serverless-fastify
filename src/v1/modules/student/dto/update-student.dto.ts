import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  rm: number;
}
