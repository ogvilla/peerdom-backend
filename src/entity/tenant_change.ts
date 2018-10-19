import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {Tenant} from './tenant';

@Entity('tenant_change')
export class TenantChange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Tenant, tenant => tenant.tenantChanges)
  @JoinColumn()
  tenant: Tenant;

  @Column()
  field: string;

  @Column()
  before: string;

  @CreateDateColumn()
  createdAt: Date;
}
