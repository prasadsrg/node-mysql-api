import { getEntityManager, Repository } from "typeorm";
import { Trip } from "./../entities/Trip";

export class TripDAO {

    private dao: Repository<Trip>;

    constructor() {
        this.dao = getEntityManager().getRepository(Trip);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "trip", 
            innerJoinAndSelect: { 
                "branch": "trip.branch",
            },   
        });
    }

    save(data: Trip) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "trip", 
            innerJoinAndSelect: { 
                 "address": "trip.address",             
                "branch": "trip.branch",
            },   
        });
    }

    delete(data: Trip) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "trip", 
            innerJoinAndSelect: {
             "branch": "trip.branch",
            },  
        });
    }

}

Object.seal(TripDAO);
