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
import {RoleHolding} from './role_holding';
import {NodeChange} from './node_change';

@Entity('node')
export class Node {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Node, parent => parent.children, {
    onDelete: 'CASCADE'
  })
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

  @Column({nullable: true})
  purpose: string;

  @Column({type: 'jsonb', nullable: true})
  policies: any;

  @Column({type: 'jsonb', nullable: true})
  notes: any;

  @Column({nullable: true})
  color: string;

  @Column({
    type: 'enum',
    enum: ['circle', 'role', 'coreRole']
  })
  type: 'circle' | 'role' | 'coreRole';

  @Column({type: 'jsonb', nullable: true})
  accountabilities: any;

  @Column({type: 'jsonb', nullable: true})
  domains: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => NodeChange, nodeChange => nodeChange.node)
  nodeChanges: NodeChange[];
}
