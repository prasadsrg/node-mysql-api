import { getEntityManager, Repository } from "typeorm";
import { AgencyDevice } from "./../entities/AgencyDevice";

export class AgencyDeviceDAO {

    private dao: Repository<AgencyDevice>;

    constructor() {
        this.dao = getEntityManager().getRepository(AgencyDevice);
    }

    search(data: any) {
        // return this.dao.find(data, {
        //     alias: "agencyDevice",
        //     innerJoinAndSelect: { 
        //         "device":"agencyDevice.device",
        //         "branch":"agencyDevice.branch"
        //     }
        // });

        return this.dao.createQueryBuilder("agencyDevice")
        .innerJoinAndSelect("agencyDevice.device", "device")
        .innerJoinAndSelect("agencyDevice.branch", "branch")
        .orderBy("agencyDevice.updatedOn", "DESC")
        .getMany();
    }

    searchByBranch(data: any) {
        return this.dao.createQueryBuilder("agencyDevice")
        .innerJoinAndSelect("agencyDevice.device", "device")
        .innerJoinAndSelect("agencyDevice.branch", "branch")
        .orderBy("agencyDevice.updatedOn", "DESC")
        .where("device.deviceIn = :branch", {branch:data})
        .getMany();
    }

    save(data: AgencyDevice) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "agencyDevice",
            innerJoinAndSelect: { 
                "device":"agencyDevice.device",
                "branch":"agencyDevice.branch"
            }
        });
    }

    delete(data: AgencyDevice) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "agencyDevice",
            innerJoinAndSelect: { 
            }
        });
    }

}

Object.seal(AgencyDeviceDAO);
