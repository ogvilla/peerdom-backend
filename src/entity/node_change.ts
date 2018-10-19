import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {Node} from './node';

@Entity('node_change')
export class NodeChange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Node, node => node.nodeChanges)
  @JoinColumn()
  node: Node;

  @Column()
  field: string;

  @Column()
  before: string;

  @CreateDateColumn()
  createdAt: Date;
}
