import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid-readable';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasksWithFilters(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { search, status } = getTasksFilterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuid(),
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== task.id);
    return task;
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = taskStatus;
    return task;
  }
}
