import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';

import {Peer} from './peer';
import {MissionChange} from './mission_change';

@Entity('mission')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(type => Peer, peer => peer.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  peer: Peer;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => MissionChange, missionChange => missionChange.mission)
  missionChanges: MissionChange[];
}
