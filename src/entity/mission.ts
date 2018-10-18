import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn
} from "typeorm";

import { Peer } from "./peer";

@Entity("mission")
export class Mission {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(type => Peer)
  @JoinColumn()
  peer: Peer;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
