import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  async findAll() {
    return [
      { name: 'Luiz', rm: 1 },
      { name: 'Lurickardo', rm: 2 },
    ];
  }

  async findOne(id: number) {
    return { id, name: 'Luiz', rm: 1 };
  }

  async create(createStudentDto: CreateStudentDto) {
    return createStudentDto;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return { id, ...updateStudentDto };
  }

  async remove(id: number) {
    return { message: `Student ${id} deleted.` };
  }
}
