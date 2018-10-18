import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm';

import {Peer} from './peer';
import {Node} from './node';

@Entity('role-holding')
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

  @Column()
  focus: string;

  @Column()
  electedUntil: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}