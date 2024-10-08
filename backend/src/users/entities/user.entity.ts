import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GoodDeed } from '../../good-deeds/entities/good-deed.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  uniqueTag: string;

  @OneToMany((type) => User, (user) => user.friends)
  friends: User[];

  @OneToMany((type) => GoodDeed, (goodDeed) => goodDeed.userId)
  goodDeeds: GoodDeed[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
