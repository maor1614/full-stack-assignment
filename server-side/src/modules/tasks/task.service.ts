import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { WorkflowRegistry } from './workflow/workflow.registry';
import { UsersService } from '../users/users.service';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    private readonly usersService: UsersService,

    private readonly workflowRegistry: WorkflowRegistry,
  ) { }


  async createTask(type: string, assignedUserId: number): Promise<Task> {
    const user = await this.usersService.findById(assignedUserId);
    if (!user) throw new BadRequestException('User not found');

    const task = this.taskRepo.create({
      type,
      status: 1,
      closed: false,
      assignedUser: user,
      data: {},
    });
    

    return this.taskRepo.save(task);
  }

  async changeStatus(
    taskId: number,
    targetStatus: number,
    nextUserId: number,
    data: any,
  ): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: ['assignedUser'],
    });

    if (!task) throw new BadRequestException('Task not found');
    if (task.closed) throw new BadRequestException('Task is closed');

    const workflow = this.workflowRegistry.get(task.type);

    workflow.validateStatusChange(task.status, targetStatus);
    workflow.validateRequiredData(targetStatus, data);

    const nextUser = await this.usersService.findById(nextUserId);
    if (!nextUser) throw new BadRequestException('User not found');

    task.status = targetStatus;
    task.assignedUser = nextUser;
    task.data = data;

    return this.taskRepo.save(task);
  }

  async closeTask(taskId: number): Promise<Task> {
    const task = await this.taskRepo.findOneBy({ id: taskId });
    if (!task) throw new BadRequestException('Task not found');

    const workflow = this.workflowRegistry.get(task.type);

    if (task.status !== workflow.finalStatus) {
      throw new BadRequestException('Task not at final status');
    }

    task.closed = true;
    return this.taskRepo.save(task);
  }

  async getOpenTasks(): Promise<Task[]> {
  return this.taskRepo.find({
    where: { closed: false },
    relations: ['assignedUser'],
    order: { id: 'DESC' },
  });
}

  async getUserTasks(userId: number): Promise<Task[]> {
    return this.taskRepo.find({
      where: { assignedUser: { id: userId } },
      relations: ['assignedUser'],
    });
  }
}
