import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  async create(createStudentDto: CreateStudentDto) {
    return createStudentDto;
  }
}
