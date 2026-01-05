export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  type: string;
  status: number;
  closed: boolean;
  assignedUser: User;
  data: Record<string, any>;
}
