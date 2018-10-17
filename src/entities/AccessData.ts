import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("access_data")
export class AccessData {
  @PrimaryColumn({ name: "name" })
  name: string;

  @Column({ name: "code" })
  code: string;

  @Column({ name: "val" })
  val: string;

  @Column({ name: "status" })
  status: boolean;
}
