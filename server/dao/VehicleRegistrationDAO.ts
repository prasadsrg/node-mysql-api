import { VehicleRegistration } from './../entities/VehicleRegistration';
import { getEntityManager, Repository } from "typeorm";


export class VehicleRegistrationDAO {

    private dao: Repository<VehicleRegistration>;

    constructor() {
        this.dao = getEntityManager().getRepository(VehicleRegistration);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "VehicleRegistartion", 
            innerJoinAndSelect: { 
                // "branch": "VehicleRegistration.branch",
            },   
        });
    }

    save(data: VehicleRegistration) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "VehicleRegistration", 
            innerJoinAndSelect: { 
                // "img": "VehicleRegistration.img",
                //  "address": "VehicleRegistration.address",             
                // "branch": "VehicleRegistration.branch",
            },   
        });
    }

    delete(data: VehicleRegistration) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "VehicleRegistration", 
            innerJoinAndSelect: {
            //  "branch": "VehicleRegistration.branch",
            },  
        });
    }

}

Object.seal(VehicleRegistrationDAO);
