import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne
} from 'typeorm';

import {Tenant} from './tenant';
import {RoleOwnership} from './roleownership';
import {Mission} from './mission';

@Entity('peer')
export class Peer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Tenant, tenant => tenant.peers)
  @JoinColumn()
  tenant: Tenant;

  @OneToMany(type => RoleOwnership, roleOwnership => roleOwnership.peer)
  roleOwnerships: RoleOwnership[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @OneToOne(type => Mission, mission => mission.peer)
  mission: Mission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
