import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Address} from "./Address";
import {Img} from "./Img";
import { Profile } from "./Profile";
@Entity("branch")
export class Branch { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "name"}) 
    name: string;

    @Column({name: "contact"}) 
    contact: string

    @Column({name: "email"}) 
    email: string;

    @Column({name: "mobile"}) 
    mobile: string;

    @Column({name: "phone"}) 
    phone: string;

    @Column({name: "pan"}) 
    pan: string;

    @Column({name: "tan"}) 
    tan: string;

    @Column({name: "gstin"}) 
    gstin: string;

    @Column({name: "lat"}) 
    lat: string;
    
    @Column({name: "lng"}) 
    lng: string;
  
    @JoinColumn({name: "address_id"})
    @ManyToOne(type => Address)
    address: Address;
    
    @JoinColumn({name: "img_id"})
    @ManyToOne(type => Img)
    img: Img;

    @Column({name: "active"}) 
    active: boolean;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 

}

