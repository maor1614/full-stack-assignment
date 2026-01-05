import { BadRequestException } from '@nestjs/common';
import { TaskWorkflow } from './task-workflow.interface';

export abstract class BaseWorkflow implements TaskWorkflow {
  abstract type: string;
  abstract finalStatus: number;

  validateStatusChange(current: number, target: number): void {
    if (target < 1) {
      throw new BadRequestException('Invalid status');
    }


    if (target > current + 1) {
      throw new BadRequestException('Cannot skip statuses');
    }

   
  }

  abstract validateRequiredData(
    targetStatus: number,
    data: Record<string, any>,
  ): void;
}
