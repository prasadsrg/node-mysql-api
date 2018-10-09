import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "../../src/models/Branch";
import { Device } from "./Device";


@Entity("agency_device")
export class AgencyDevice { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "payment_type"}) 
    paymentType: string;

    @Column({name: "unit_price"}) 
    unitPrice: number;

    @Column({name: "sgst"}) 
    sgst: number;

    @Column({name: "cgst"}) 
    cgst: number;

    @Column({name: "igst"}) 
    igst: number;

    @Column({name: "paid"})
    paid: boolean;

    @Column({name: "amount"})
    amount: number;
    
    @Column({name: "discount"}) 
    discount: number;
    
    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;

    @JoinColumn({name: "branch_id"})
    @ManyToOne(type => Branch)
    branch: string;

    @JoinColumn({name: "device_id"})
    @ManyToOne(type => Device)
    device: string;

}

