import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany
} from "typeorm";

import { Peer } from "./peer";

@Entity("tenant")
export class Tenant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(type => Peer, peer => peer.tenant)
  peers: Peer[];

  @Column()
  tenantName: string;

  @Column({ type: "jsonb", nullable: false })
  mapSettings: any;

  @Column({ type: "jsonb", nullable: false })
  missionSettings: any;

  @Column({ type: "jsonb", nullable: false })
  matomoSettings: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
