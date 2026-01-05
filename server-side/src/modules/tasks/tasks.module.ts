import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../modules/tasks/task.entity';
import { UsersModule } from '../../modules/users/users.module'; 
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { WorkflowRegistry } from './workflow/workflow.registry'; 
import { ProcurementWorkflow } from './workflow/procurement.workflow';
import { DevelopmentWorkflow } from './workflow/development.workflow';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    WorkflowRegistry,
    ProcurementWorkflow,
    DevelopmentWorkflow,
  ],
})
export class TasksModule {}
