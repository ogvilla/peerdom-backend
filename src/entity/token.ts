import {Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';

import {User} from './user';

@Entity('token')
export class Token {
  @PrimaryColumn()
  id: string;

  @ManyToOne(type => User, user => user.tokens)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
