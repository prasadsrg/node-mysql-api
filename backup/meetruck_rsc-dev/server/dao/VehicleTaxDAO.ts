import { VehicleTax } from './../entities/VehicleTax';
import { getEntityManager, Repository } from "typeorm";


export class VehicleTaxDAO {

    private dao: Repository<VehicleTax>;

    constructor() {
        this.dao = getEntityManager().getRepository(VehicleTax);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "VehicleTax", 
            innerJoinAndSelect: { 
                // "branch": "VehicleTax.branch",
            },   
        });
    }

    save(data: VehicleTax) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "VehicleTax", 
            innerJoinAndSelect: { 
                // "img": "VehicleTax.img",
                //  "address": "VehicleTax.address",             
                // "branch": "VehicleTax.branch",
            },   
        });
    }

    delete(data: VehicleTax) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "VehicleTax", 
            innerJoinAndSelect: {
            //  "branch": "VehicleTax.branch",
            },  
        });
    }

}

Object.seal(VehicleTaxDAO);
