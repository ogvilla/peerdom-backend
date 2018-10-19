import {Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {Peer} from './peer';

@Entity('peer_change')
export class PeerChange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Peer, peer => peer.peerChanges)
  @JoinColumn()
  peer: Peer;

  @Column()
  field: string;

  @Column()
  before: string;

  @CreateDateColumn()
  createdAt: Date;
}
