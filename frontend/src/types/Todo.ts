export type Todo = {
  readonly id: number;
  title: string;
  isDone: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
};
