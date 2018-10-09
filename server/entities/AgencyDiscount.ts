import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "../../src/models/Branch";

@Entity("agency_discount")
export class AgencyDiscount { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "discount"}) 
    discount: number;

    @JoinColumn({name: "branch_id"})
    @ManyToOne(type => Branch)
    branchId: Branch;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
}