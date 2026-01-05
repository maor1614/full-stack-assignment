export const FINAL_STATUS: Record<string, number> = {
  PROCUREMENT: 3,
  DEVELOPMENT: 4,
};

export function getRequiredFields(type: string, status: number): string[] {
  if (type === 'PROCUREMENT') {
    if (status === 2) return ['quote1', 'quote2'];
    if (status === 3) return ['receipt'];
    return [];
  }

  if (type === 'DEVELOPMENT') {
    if (status === 2) return ['specification'];
    if (status === 3) return ['branch'];
    if (status === 4) return ['version'];
    return [];
  }

  return [];
}
