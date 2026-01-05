import { DataSource } from 'typeorm';
import { User } from './src/modules/users/user.entity';
import { Task } from './src/modules/tasks/task.entity';

export default new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Task],
  migrations: ['src/database/migrations/*.ts'],
});
