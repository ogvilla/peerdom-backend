import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

import {Peer} from './peer';
import {Node} from './node';
import {RoleHoldingChange} from './role_holding_change';

@Entity('role_holding')
@Index(['peer', 'role', 'circle'], {unique: true})
export class RoleHolding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Peer, peer => peer.roleHoldings)
  @JoinColumn()
  peer: Peer;

  @ManyToOne(type => Node, node => node.roleHoldings)
  @JoinColumn()
  role: Node;

  @ManyToOne(type => Node, node => node.coreRoleHoldings)
  @JoinColumn()
  circle: Node;

  @Column({nullable: true})
  focus: string;

  @Column({nullable: true})
  electedUntil: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => RoleHoldingChange, roleHoldingChange => roleHoldingChange.roleHolding)
  roleHoldingChanges: RoleHoldingChange[];
}
