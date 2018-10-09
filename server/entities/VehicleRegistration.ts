import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "../../src/models/Branch";
import { Img } from "../../src/models/Img";


@Entity("vehicle_registration")
export class VehicleRegistration { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "registration_no"}) 
    registrationNo: string;

    @Column({name: "registration_date"}) 
    registrationDate: Date;

    @Column({name: "registration_validity"}) 
    registrationValidity: Date;

    @Column({name: "chassis_no"}) 
    chassisNo: string;

    @Column({name: "engine_no"}) 
    engineNo: string;

    @Column({name: "owner_name"})
    ownerName: string;
    
    // @JoinColumn({name: "front_img_id"})
    // @ManyToOne(type => Img)
    // frontImg: Img;

    // @JoinColumn({name: "back_img_id"})
    // @ManyToOne(type => Img)
    // backImg: Img;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
}

