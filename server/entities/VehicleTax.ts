import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "../../src/models/Branch";
import { Img } from "../../src/models/Img";


@Entity("vehicle_tax")
export class VehicleTax { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "transaction_no"}) 
    transactionNo: string;

    @Column({name: "expiration_date"}) 
    expirationDate: Date;
    
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

