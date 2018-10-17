// import { Repository, getRepository } from "typeorm";
// import { Consumer } from "../../entities/Consumer";

// export class ConsumerDAO {
//     private dao: Repository<Consumer>;


//     constructor() {
//         this.run();
//     }

//     async run() {
//         this.dao = await getRepository(Consumer);
//     }

//     async search(data: any) {
//         return await this.dao
//         .createQueryBuilder("consumer")
//         .innerJoinAndSelect("consumer.address", "address")
//         .orderBy("Consumer.updateOn", "DESC")
//         .where(data)
//         .andWhere("consumer.role != 'SUPER_ADMIN'")
//         .get


// }