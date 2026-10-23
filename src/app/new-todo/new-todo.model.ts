export interface TodoStatus {
  id: string;
  label: string;
  color: string;
  order: number;
}

export interface Todo {
  id: number;
  name: string;
  content: string;
  statusId: string;
}
