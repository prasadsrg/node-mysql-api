import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import {Vehicle} from "./Vehicle";
import {Profile} from "./Profile";
import {Driver} from "./Driver";
@Entity("trip")
export class Trip{
    @PrimaryColumn({name: "id"}) 
    id: string;
 
      @Column({name: "imei_no"})
   imeiNo: string;
 
   @JoinColumn({name: "profile_id"})
   @ManyToOne(type => Profile)
   profile: string;
 
 @JoinColumn({name: "vehicle_id"})
   @ManyToOne(type => Vehicle)
   vehicle: string;
 
   @JoinColumn({name: "primary_driver_id"})
   @ManyToOne(type => Driver)
   primaryDriver: string;
 
   @JoinColumn({name: "alternative_driver_id"})
   @ManyToOne(type => Driver)
   alternativeDriver: string;
 
    @Column({name: "avg_speed"})
   avgSpeed: number;
 
    @Column({name: "avg_time"})
   avgTime: number;
 
    @Column({name: "avg_distance"})
   avgDistance: number;
 
    @Column({name: "amount"})
   amount: number;
 
    @Column({name: "trip_date"})
   tripDate: Date;
 
    @Column({name: "updated_by"})
   updatedBy: string;
 
    @Column({name: "updated_on"})
   updatedOn: Date;
 }