import { VehicleInsurance } from './../entities/VehicleInsurance';
import { getEntityManager, Repository } from "typeorm";


export class VehicleInsuranceDAO {

    private dao: Repository<VehicleInsurance>;

    constructor() {
        this.dao = getEntityManager().getRepository(VehicleInsurance);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "VehicleInsurance", 
            innerJoinAndSelect: { 
                // "branch": "VehicleInsurance.branch",
                "frontImg": "VehicleInsurance.frontImg",
                "backImg": "VehicleInsurance.backImg"
            },   
        });
    }

    save(data: VehicleInsurance) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "VehicleInsurance", 
            innerJoinAndSelect: { 
                // "img": "VehicleInsurance.img",
                //  "address": "VehicleInsurance.address",             
                // "branch": "VehicleInsurance.branch",
                "frontImg": "VehicleInsurance.frontImg",
                "backImg": "VehicleInsurance.backImg"
            },   
        });
    }

    delete(data: VehicleInsurance) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "VehicleInsurance", 
            innerJoinAndSelect: {
            //  "branch": "VehicleInsurance.branch",
            },  
        });
    }

}

Object.seal(VehicleInsuranceDAO);
