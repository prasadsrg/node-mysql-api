import { getEntityManager, Repository } from "typeorm";
import { Driver } from "./../entities/Driver";

export class DriverDAO {

    private dao: Repository<Driver>;

    constructor() {
        this.dao = getEntityManager().getRepository(Driver);
    }

    search(data: any) {
        // return this.dao.find(data, {
        //     alias: "driver", 
        //     innerJoinAndSelect: { 
        //         "profile": "driver.profile",
        //         "img": "profile.img",
        //         "address": "profile.address",
        //         "frontImg": "driver.frontImg",
        //         "backImg": "driver.backImg",
        //         "branch":"profile.branch"
        //     }
        // });
        return this.dao.createQueryBuilder("driver")
        .innerJoinAndSelect("driver.profile", "profile")
        .innerJoinAndSelect("profile.branch", "branch")
        .innerJoinAndSelect("profile.address", "address")
        .innerJoinAndSelect("profile.img", "img")
        .innerJoinAndSelect("driver.frontImg", "frontImg")
        .innerJoinAndSelect("driver.backImg", "backImg")
        .orderBy("profile.updatedOn", "DESC")
        .getMany();
    }

    searchByBranch(data: any) {
        return this.dao.createQueryBuilder("driver")
        .innerJoinAndSelect("driver.profile", "profile")
        .innerJoinAndSelect("profile.branch", "branch")
        .innerJoinAndSelect("profile.address", "address")
        .innerJoinAndSelect("profile.img", "img")
        .innerJoinAndSelect("driver.frontImg", "frontImg")
        .innerJoinAndSelect("driver.backImg", "backImg")
        .orderBy("profile.updatedOn", "DESC")
        .where("profile.branch = :branch", {branch:data})
        .getMany();
    }

    save(data: Driver) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "driver", 
            innerJoinAndSelect: { 
                "profile": "driver.profile",
                "img": "profile.img",
                "address": "profile.address",
                "frontImg": "driver.frontImg",
                "backImg": "driver.backImg",
                "branch":"profile.branch"
            },   
        });
    }

    delete(data: Driver) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "driver", 
            innerJoinAndSelect: {
            //  "branch": "driver.branch",
            },  
        });
    }

}

Object.seal(DriverDAO);
