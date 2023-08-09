import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExceptionDto } from 'src/config/error/exception.dto';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('v1/student')
@ApiTags('Student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create student.' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await this.studentService.create(createStudentDto);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }
}
