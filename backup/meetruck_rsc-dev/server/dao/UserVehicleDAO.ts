import { UserVehicle } from './../entities/UserVehicle';
import { getEntityManager, Repository } from "typeorm";

export class UserVehicleDAO {

    private dao: Repository<UserVehicle>;

    constructor() {
        this.dao = getEntityManager().getRepository(UserVehicle);
    }

    search(data: any) {
        console.log(data)
        return this.dao.find(data, {
            alias: "UserVehicle", 
            innerJoinAndSelect: { 
                "vehicle":"UserVehicle.vehicle",
                "device":"UserVehicle.device",
                "primaryDriver":"UserVehicle.primaryDriver",
                "alternativeDriver":"UserVehicle.alternativeDriver"
            },   
        });
    }

    searchByBranch(data: any) {
        return this.dao.createQueryBuilder("UserVehicle")
        .innerJoinAndSelect("UserVehicle.vehicle", "vehicle")
        .innerJoinAndSelect("UserVehicle.device", "device")
        .innerJoinAndSelect("UserVehicle.primaryDriver", "primaryDriver")
        .innerJoinAndSelect("UserVehicle.alternativeDriver", "alternativeDriver")
        .orderBy("UserVehicle.updatedOn", "DESC")
        .where("vehicle.branch = :branch", {branch:data})
        .getMany();
    }


    save(data: UserVehicle) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "UserVehicle", 
            innerJoinAndSelect: { 
                // "img": "UserVehicle.img",
                //  "address": "UserVehicle.address",             
                // "branch": "UserVehicle.branch",
                // "profile":"UserVehicle.profile",
                "vehicle":"UserVehicle.vehicle",
                "device":"UserVehicle.device"
            },   
        });
    }

    delete(data: UserVehicle) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "UserVehicle", 
            innerJoinAndSelect: {
            //      
            },  
        });
    }

}

Object.seal(UserVehicleDAO);
