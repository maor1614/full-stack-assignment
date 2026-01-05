import { Injectable } from '@nestjs/common';
import { TaskWorkflow } from './task-workflow.interface';
import { ProcurementWorkflow } from './procurement.workflow';
import { DevelopmentWorkflow } from './development.workflow';


@Injectable()
export class WorkflowRegistry {
  private workflows = new Map<string, TaskWorkflow>();

  constructor(
    procurement: ProcurementWorkflow,
    development: DevelopmentWorkflow,
  ) {
    this.register(procurement);
    this.register(development);
  }

  register(workflow: TaskWorkflow): void {
    this.workflows.set(workflow.type, workflow);
  }

  get(type: string): TaskWorkflow {
    const workflow = this.workflows.get(type);
    if (!workflow) {
      throw new Error(`Unsupported task type: ${type}`);
    }
    return workflow;
  }
}
