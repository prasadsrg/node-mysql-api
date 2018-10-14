import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Address } from "./Address";
import { Img } from "./Img";

@Entity("consumer")
export class Consumer {
  @PrimaryColumn({ name: "id" })
  id: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "mobile" })
  mobile: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "aadhar" })
  aadhar: string;

  @Column({ name: "active" })
  active: boolean;

  @Column({ name: "vid" })
  vid: string;

  @JoinColumn({ name: "address_id" })
  @ManyToOne(type => Address)
  address: Address;

  @JoinColumn({ name: "img_id" })
  @ManyToOne(type => Img)
  img: Img;

  @Column({ name: "created_on" })
  createdOn: Date;

  @Column({ name: "updated_on" })
  updatedOn: Date;

  @Column({ name: "updated_by" })
  updatedBy: string;
}
