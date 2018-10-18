import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import {Tenant} from './tenant';
import {RoleHolding} from './roleholding';

@Entity('node')
export class Node {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Node, parent => parent.children)
  @JoinColumn()
  parent: Node;

  @OneToMany(type => Node, node => node.parent)
  children: Node[];

  @ManyToOne(type => Tenant, tenant => tenant.nodes)
  @JoinColumn()
  tenant: Tenant;

  @OneToMany(type => RoleHolding, roleHolding => roleHolding.role)
  roleHoldings: RoleHolding[];

  // in case ( and only in this case ) this object is a circle, it can contain core role
  @OneToMany(type => RoleHolding, coreRoleHolding => coreRoleHolding.circle)
  coreRoleHoldings: RoleHolding[];

  @Column()
  name: string;

  @Column()
  purpose: string;

  @Column()
  policy: string;

  @Column({type: 'jsonb', nullable: false})
  notes: any;

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: ['circle', 'role', 'core_role']
  })
  type: 'circle' | 'role' | 'core_role';

  @Column({type: 'jsonb', nullable: false})
  accountabilities: any;

  @Column({type: 'jsonb', nullable: false})
  domains: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
