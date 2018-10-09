import { getEntityManager, Repository } from "typeorm";
import { TripRoute } from "./../entities/TripRoute";


export class TripRouteDAO {

    private dao: Repository<TripRoute>;

    constructor() {
        this.dao = getEntityManager().getRepository(TripRoute);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "tripRoute", 
            innerJoinAndSelect: { 
                "branch": "tripRoute.branch",
            },   
        });
    }

    save(data: TripRoute) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "tripRoute", 
            innerJoinAndSelect: { 
                "img": "tripRoute.img",
                 "address": "tripRoute.address",             
                "branch": "tripRoute.branch",
            },   
        });
    }

    delete(data: TripRoute) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "tripRoute", 
            innerJoinAndSelect: {
             "branch": "tripRoute.branch",
            },  
        });
    }

}

Object.seal(TripRouteDAO);
