export interface TaskWorkflow {
  readonly type: string;
  readonly finalStatus: number;

  validateStatusChange(
    currentStatus: number,
    targetStatus: number,
  ): void;

  validateRequiredData(
    targetStatus: number,
    data: Record<string, any>,
  ): void;
}
