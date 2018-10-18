import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany} from 'typeorm';

import {Peer} from './peer';
import {Node} from './node';

@Entity('tenant')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Peer, peer => peer.tenant)
  peers: Peer[];

  @OneToMany(type => Node, node => node.tenant)
  nodes: Node[];

  @Column()
  tenantName: string;

  @Column({type: 'jsonb', nullable: false})
  mapSettings: any;

  @Column({type: 'jsonb', nullable: false})
  missionSettings: any;

  @Column({type: 'jsonb', nullable: false})
  matomoSettings: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
