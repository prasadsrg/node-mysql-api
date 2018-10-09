import { getEntityManager, Repository } from "typeorm";
import { Device} from "./../entities/Device";
import { Branch } from "../../src/models/Branch";

export class DeviceDAO {

    private dao: Repository<Device>;

    constructor() {
        this.dao = getEntityManager().getRepository(Device);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "device", 
            innerJoinAndSelect: { 
            
            },   
        });

        // return this.dao.createQueryBuilder("device")
        // .innerJoin("device.device_in", "branch")
        // .orderBy("device.updated_on", "DESC")
        // .getMany();
    }


    searchByBranch(data: any) {
        return this.dao.createQueryBuilder("device")
        .innerJoinAndSelect("branch", "branch" ,"branch.id = device.deviceIn")
        .orderBy("device.updated_on", "DESC")
        .where("device.deviceIn = :branch", {branch:data})
        .getMany();
    }
    
    save(data: any) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "device", 
            innerJoinAndSelect: { 
              
            },   
        });
    }

    delete(data: Device) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "device", 
            innerJoinAndSelect: {
            
            },  
        });
    }

}

Object.seal(DeviceDAO);
