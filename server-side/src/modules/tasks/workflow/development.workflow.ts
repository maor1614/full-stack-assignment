import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseWorkflow } from './base-workflow';

@Injectable()
export class DevelopmentWorkflow extends BaseWorkflow {
  type = 'DEVELOPMENT';
  finalStatus = 4;

  validateRequiredData(status: number, data: any): void {
    if (status === 2 && !data?.specification) {
      throw new BadRequestException('Specification is required');
    }

    if (status === 3 && !data?.branch) {
      throw new BadRequestException('Branch name is required');
    }

    if (status === 4 && !data?.version) {
      throw new BadRequestException('Version is required');
    }
  }
}
