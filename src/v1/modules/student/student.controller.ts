import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExceptionDto } from '../../../config/error/exception.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('v1/student')
@ApiTags('Student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: 'Find all students.' })
  async findAll() {
    try {
      return await this.studentService.findAll();
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find student by id.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.studentService.findOne(id);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create student.' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await this.studentService.create(createStudentDto);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateStudentDto,
  ) {
    try {
      return await this.studentService.update(id, updateUserDto);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.studentService.remove(id);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }
}
