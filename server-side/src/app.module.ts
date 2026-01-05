import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module'; 
import { User } from './modules/users/user.entity';
import { Task } from './modules/tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Task],
      synchronize: false, 
      migrations: ['dist/database/migrations/*.js'],
    }),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
