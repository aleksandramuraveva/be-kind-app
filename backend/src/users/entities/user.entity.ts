import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

  @OneToMany(() => GoodDeed, goodDeed => goodDeed.user)
  goodDeeds: GoodDeed[];

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

