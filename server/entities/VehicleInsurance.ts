import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "../../src/models/Branch";
import { Img } from "../../src/models/Img";


@Entity("vehicle_insurance")
export class VehicleInsurance { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "company_name"}) 
    companyName: string;

    @Column({name: "company_number"}) 
    companyNumber: string;

    @Column({name: "policy_number"}) 
    policyNumber: string;

    @Column({name: "effective_date"}) 
    effectiveDate: Date;

    @Column({name: "expiration_date"}) 
    expirationDate: Date;

    @Column({name: "amount"})
    amount: number;
    
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

