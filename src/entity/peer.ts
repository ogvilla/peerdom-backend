import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
  Index
} from 'typeorm';

import {Tenant} from './tenant';
import {RoleHolding} from './role_holding';
import {Mission} from './mission';
import {PeerChange} from './peer_change';

@Entity('peer')
@Index(['displayName', 'tenant'], {unique: true})
export class Peer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Tenant, tenant => tenant.peers, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  tenant: Tenant;

  @OneToMany(type => RoleHolding, roleHolding => roleHolding.peer, {
    onDelete: 'CASCADE'
  })
  roleHoldings: RoleHolding[];

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  displayName: string;

  @OneToOne(type => Mission, mission => mission.peer, {
    onDelete: 'CASCADE'
  })
  mission: Mission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => PeerChange, peerChange => peerChange.peer, {
    onDelete: 'CASCADE'
  })
  peerChanges: PeerChange[];
}
