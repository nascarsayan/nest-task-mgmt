import { BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { TaskStatus } from './task.model';

export class Task extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
