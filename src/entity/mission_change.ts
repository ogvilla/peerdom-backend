import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {Mission} from './mission';

@Entity('mission_change')
export class MissionChange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Mission, mission => mission.missionChanges)
  @JoinColumn()
  mission: Mission;

  @Column()
  field: string;

  @Column()
  before: string;

  @CreateDateColumn()
  createdAt: Date;
}
