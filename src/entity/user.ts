import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToMany
} from 'typeorm';

import {Tenant} from './tenant';
import {Token} from './token';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Tenant, tenant => tenant.peers)
  tenant: Tenant;

  @OneToMany(type => Token, token => token.user)
  tokens: Token[];

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
