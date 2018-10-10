import { Vehicle } from './../entities/Vehicle';
import { getEntityManager, Repository } from "typeorm";

export class VehicleDAO {

    private dao: Repository<Vehicle>;

    constructor() {
        this.dao = getEntityManager().getRepository(Vehicle);
    }

    search(data: any) {
        return this.dao.createQueryBuilder("vehicle")
        .innerJoinAndSelect("vehicle.vehicleInsurance", "vehicleinsurance")
        .innerJoinAndSelect("vehicle.vehicleRegistration", "vehicleregistration")
        .innerJoinAndSelect("vehicle.vehicleTax", "vehicletax")
        .innerJoinAndSelect("vehicle.profile", "profile")
        .innerJoinAndSelect("vehicle.branch", "branch")
        .innerJoinAndSelect("vehicle.img", "img")
        .orderBy("vehicle.updatedOn", "DESC")
        .getMany();
    }

    searchByBranch(data: any) {
        return this.dao.createQueryBuilder("vehicle")
        .innerJoinAndSelect("vehicle.vehicleInsurance", "vehicleinsurance")
        .innerJoinAndSelect("vehicle.vehicleRegistration", "vehicleregistration")
        .innerJoinAndSelect("vehicle.vehicleTax", "vehicletax")
        .innerJoinAndSelect("vehicle.profile", "profile")
        .innerJoinAndSelect("vehicle.branch", "branch")
        .innerJoinAndSelect("vehicle.img", "img")
        .orderBy("vehicle.updatedOn", "ASC")
        .where("vehicle.branch = :branch", {branch:data})
        .getMany();
    }

    save(data: Vehicle) {
        // console.log(data)
        // console.log("frm teh veh dao")
        return this.dao.persist(data);
    }

    vehicleentity(data: any){    
        let sqlQuery =
         `select   v.profile_id as profile_id,v.id as vehicle_id,v.vehicle_no as vehicleno,
         uv.id as user_vehicle_id,d.imei_no as Device_imei,d.id as device_id,p.name as Driver_name,
         p.email as Driver_Email,p.mobile as Driver_contactno from meetruck_dev.vehicle v
        inner join meetruck_dev.user_vehicle uv on uv.vehicle_id=v.vehicle_registration_id
        inner join meetruck_dev.device d on d.id=uv.device_id 
        inner join meetruck_dev.profile p on p.id = v.profile_id
        where v.profile_id='${data.id}' `;
         
        console.log(sqlQuery)
        const result = getEntityManager().query(sqlQuery);
    
        return result;
        
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "vehicle", 
            innerJoinAndSelect: { 
                // "img": "vehicle.img",
                //  "address": "vehicle.address",             
                // "branch": "vehicle.branch",
                // "vehicleinsurance":"vehicle.vehicleInsurance"

                "vehicleinsurance":"vehicle.vehicleInsurance",
                "vehicleregistration":"vehicle.vehicleRegistration",
                "vehicletax":"vehicle.vehicleTax",
                "branch": "vehicle.branch",
                "profile": "vehicle.profile",
                "img": "vehicle.img",
            
            },   
        });
    }

    delete(data: Vehicle) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "vehicle", 
            innerJoinAndSelect: {
            //  "branch": "vehicle.branch",
            },  
        });
    }

}

Object.seal(VehicleDAO);
