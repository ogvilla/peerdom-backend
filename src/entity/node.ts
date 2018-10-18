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
import {RoleOwnership} from './roleownership';

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

  @OneToMany(type => RoleOwnership, roleOwnership => roleOwnership.role)
  roleOwnerships: RoleOwnership[];

  @OneToMany(type => RoleOwnership, coreRoleOwnership => coreRoleOwnership.circle)
  coreRoleOwnerships: RoleOwnership[];

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
