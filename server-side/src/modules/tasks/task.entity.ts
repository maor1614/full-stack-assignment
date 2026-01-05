import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; 

  @Column()
  status: number;

  @Column({ default: false })
  closed: boolean;

  @ManyToOne(() => User)
  assignedUser: User;

  @Column({ type: 'simple-json', nullable: true })
  data: Record<string, any>;
}
