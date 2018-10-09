import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("access_menu")
export class AccessMenu {
  @PrimaryColumn({ name: "id" })
  id: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "menu" })
  menu: string;

  @Column({ name: "role" })
  role: string;

  @Column({ name: "write_access" })
  writeAccess: string;

  @Column({ name: "active" })
  active: boolean;

  @Column({ name: "priority" })
  priority: number;

  @Column({ name: "updated_by" })
  updatedBy: string;

  @Column({ name: "updated_on" })
  updatedOn: Date;

  @Column({ name: "vid" })
  vid: string;
}
