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

@Entity('role-ownership')
@Index(['peer', 'role', 'circle'], {unique: true})
export class RoleOwnership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Peer, peer => peer.roleOwnerships)
  @JoinColumn()
  peer: Peer;

  @ManyToOne(type => Node, node => node.roleOwnerships)
  @JoinColumn()
  role: Node;

  @ManyToOne(type => Node, node => node.coreRoleOwnerships)
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
