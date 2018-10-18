import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

import {Tenant} from './tenant';
import {RoleHolding} from './roleholding';

@Entity('peer')
export class Peer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Tenant, tenant => tenant.peers)
  @JoinColumn()
  tenant: Tenant;

  @OneToMany(type => RoleHolding, roleHolding => roleHolding.peer)
  roleHoldings: RoleHolding[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
