import { getEntityManager, Repository } from "typeorm";
import { AppData } from "../../src/models/AppData";

export class AppDataDAO {

    private dao: Repository<AppData>;

    constructor() {
        this.dao = getEntityManager().getRepository(AppData);
    }

    search(data: any) {
        // return this.dao.find(data, {
        //     alias: "appData", 
        // });

        return this.dao.createQueryBuilder("appData")
 
       .orderBy("appData.updated_on", "DESC")
       .getMany();
    }

    save(data: AppData) {
        return this.dao.persist(data);
    }

    entity(id: string) {
        return this.dao.findOneById(id, {
            alias: "appData", 
        });
    }

    delete(data: AppData) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data, {
            alias: "appData", 
        });
    }
    async nextSeq(id: string, host: string){
        let query = "UPDATE app_data SET name=LPAD(CAST(name AS unsigned INTEGER)+1,7,0) WHERE id='INVOICE_"+id+"' and host='"+host+"'";
        console.log(query);
        let string = await getEntityManager().query(query);
        let data: any = await getEntityManager().query("SELECT name FROM app_data WHERE id='INVOICE_"+id+"' and host='"+host+"'");
        // console.log(data);
        return data[0].name;
    }

}

Object.seal(AppDataDAO);
