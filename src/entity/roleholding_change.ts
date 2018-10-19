import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {RoleHolding} from './roleholding';

@Entity('roleholding_change')
export class RoleHoldingChange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => RoleHolding, roleholding => roleholding.roleholdingChanges)
  @JoinColumn()
  roleholding: RoleHolding;

  @Column()
  field: string;

  @Column()
  before: string;

  @CreateDateColumn()
  createdAt: Date;
}
