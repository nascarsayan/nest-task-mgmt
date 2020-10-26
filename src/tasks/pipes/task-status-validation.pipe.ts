import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: string) {
    value = value.toUpperCase();
    if (!Object.values(TaskStatus).includes(value as TaskStatus)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }
}
