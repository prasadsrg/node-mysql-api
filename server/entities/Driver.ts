import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Branch } from "../../src/models/Branch";
import { Profile } from "../../src/models/Profile";
import { Img } from "../../src/models/Img";

@Entity("driver")
export class Driver { 
    @PrimaryColumn({name: "id"}) 
    id: string;

    @Column({name: "license"}) 
    license: string;

    @Column({name: "expiration_date"}) 
    expirationDate: Date;

    @Column({name: "updated_by"}) 
    updatedBy: string;

    @Column({name: "updated_on"}) 
    updatedOn: Date;
 
    @JoinColumn({name: "profile_id"})
    @ManyToOne(type => Profile)
    profile: Profile;
    
    @JoinColumn({name: "front_img_id"})
    @ManyToOne(type => Img)
    frontImg: Img;

    @JoinColumn({name: "back_img_id"})
    @ManyToOne(type => Img)
    backImg: Img;

}
