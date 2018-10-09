import {Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from "typeorm";

// import { Branch } from "./Branch";
import { Device } from "./Device";
import {Vehicle} from "./Vehicle";
import {Profile} from "../../src/models/Profile";
import {Driver} from "./Driver";

@Entity("user_vehicle")
export class UserVehicle {
    @PrimaryColumn({name: "id"}) 
    id: string;
  
    // @JoinColumn({name: "profile_id"})
    // @ManyToOne(type => Profile)
    // profile: string;
  
    @JoinColumn({name: "vehicle_id"})
    @ManyToOne(type => Vehicle)
    vehicle: string;
  
    @JoinColumn({name: "primary_driver_id"}) 
    @ManyToOne(type => Profile)
    primaryDriver: string;

    @JoinColumn({name: "alternative_driver_id"}) 
    @ManyToOne(type => Profile)
    alternativeDriver: string;

  @JoinColumn({name: "device_id"})
    @ManyToOne(type => Device)
    device: string;
  
  // @JoinColumn({name: "branch_id"})
  //   @ManyToOne(type => Branch)
  //   branch: string;

    @Column({name: "updated_by"})
    updatedBy: string;
  
    @Column({name: "updated_on"})
    updatedOn: Date;
  }