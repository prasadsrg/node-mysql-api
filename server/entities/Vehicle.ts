import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Driver } from "./Driver";
import { Profile } from "../../src/models/Profile";
import { Img } from "../../src/models/Img";
import {Branch} from "../../src/models/Branch";
import {VehicleTax} from "./VehicleTax";
import {VehicleInsurance} from "./VehicleInsurance";
import {VehicleRegistration} from "./VehicleRegistration";
import {Device} from './Device';

@Entity("vehicle")
export class Vehicle { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    // @Column({name: "imei_no"}) 
    // imeiNo: string;

    @Column({name: "vehicle_no"}) 
    vehicleNo: string;

    @Column({name: "vehicle_condition"}) 
    vehicleCondition: string;
 
    @Column({name: "capacity"}) 
    capacity: string;

    @Column({name: "vehicle_type"}) 
    vehicleType: string;

    @JoinColumn({name: "vehicle_tax_id"}) 
    @ManyToOne(type => VehicleTax)
    vehicleTax: string;

    @JoinColumn({name: "vehicle_registration_id"}) 
    @ManyToOne(type => VehicleRegistration)
    vehicleRegistration: string;

    @JoinColumn({name: "vehicle_insurance_id"}) 
    @ManyToOne(type => VehicleInsurance)
    vehicleInsurance: string;
   
    @Column({name: "active"}) 
    active: boolean;

    @JoinColumn({name: "branch_id"}) 
    @ManyToOne(type => Branch)
    branch: string;

    @JoinColumn({name: "profile_id"})
    @ManyToOne(type => Profile)
    profile: Profile;


    @JoinColumn({name: "img_id"})
    @ManyToOne(type => Img)
    img: Img;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;

}

