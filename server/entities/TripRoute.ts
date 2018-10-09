import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

import { Trip } from "./Trip";


@Entity("trip_route")
export class TripRoute{

    @PrimaryColumn({name: "id"}) 
    id: string;

   @Column({name: "day_time"})
 dayTime: Date;

   @Column({name: "lat"})
 lat: string;

   @Column({name: "lng"})
 lng: string;

   @Column({name: "speed"})
 speed: string;

   @JoinColumn({name: "trip_id"})
 @ManyToOne(type => Trip)
 trip: string;
}