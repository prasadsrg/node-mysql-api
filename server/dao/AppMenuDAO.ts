import { getEntityManager, Repository } from "typeorm";
import { AppMenu } from "./../entities/AppMenu";

export class AppMenuDAO {

    private dao: Repository<AppMenu>;

    constructor() {
        this.dao = getEntityManager().getRepository(AppMenu);
    }

    search(data: any) {
        return this.dao.find(data, {
            alias: "appMenu",
            innerJoinAndSelect: { 
            }
        });

    //     return this.dao.createQueryBuilder("appMenu")
    //    .orderBy("appMenu.updated_on", "DESC")
    //    .getMany();
    }

    save(data: AppMenu) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "appMenu",
            innerJoinAndSelect: { 
            }
        });
    }

    delete(data: AppMenu) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "appMenu",
            innerJoinAndSelect: { 
            }
        });
    }

}

Object.seal(AppMenuDAO);
