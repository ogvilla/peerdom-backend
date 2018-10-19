import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {RoleHolding} from './role_holding';

@Entity('role_holding_change')
export class RoleHoldingChange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => RoleHolding, roleHolding => roleHolding.roleHoldingChanges)
  @JoinColumn()
  roleHolding: RoleHolding;

  @Column()
  field: string;

  @Column()
  before: string;

  @CreateDateColumn()
  createdAt: Date;
}
