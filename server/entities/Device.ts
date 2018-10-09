import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";


@Entity("device")
export class Device { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "imei_no",unique:true}) 
    imeiNo: string;

    @Column({name: "registration_no"}) 
    registrationNo: string;

    @Column({name: "activation_date"}) 
    activationDate: Date;

    @Column({name: "expiration_date"}) 
    expirationDate: Date;

    @Column({name: "device_in"}) 
    deviceIn: string;

    @Column({name: "unit_price"}) 
    unitPrice: number;

    @Column({name: "sgst"}) 
    sgst: number;

    @Column({name: "cgst"}) 
    cgst: number;

    @Column({name: "igst"}) 
    igst: number;

    @Column({name: "active"})
    active: boolean;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
}