import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseWorkflow } from './base-workflow';

@Injectable()
export class ProcurementWorkflow extends BaseWorkflow {
  type = 'PROCUREMENT';
  finalStatus = 3;

  validateRequiredData(status: number, data: any): void {
    if (status === 2) {
      if (!data?.quotes || data.quotes.length !== 2) {
        throw new BadRequestException(
          'Exactly 2 price quotes are required',
        );
      }
    }

    if (status === 3 && !data?.receipt) {
      throw new BadRequestException('Receipt is required');
    }
  }
}
