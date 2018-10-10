import { Branch } from './../../entities/Branch';
import { getEntityManager, Repository, QueryBuilder } from "typeorm";
import * as url from "url";


export class DataLoadService {
    public sessionInfo: any;
    constructor() {

    }

    codes(request) {
        try {
            let data: any = [];
            data.push(
                { key: "COURSE_TYPE", name: "COURSE TYPE" },
                { key: "PAYMENT_MODE", name: "PAYMENT MODE" }
            )
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }


    branchs(request) {
        try {
            let sqlQuery = `select id, name from branch`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    roles(request) {
        try {
            let sqlQuery = "select name as id,name from app_data where code='Role'";
            let data = getEntityManager().query(sqlQuery);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    profiles(request) {
        try {
            let sqlQuery = `select id, name from profile where role not in ('Super Admin') and active= 1`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    vehicletypes(request) {
        try {
            let sqlQuery = `select id, name from app_data where code = 'VehicleType' order by updated_on ASC `;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    vehiclenumbers(request) {
        try {
            let sqlQuery = `select id, vehicle_no AS vehicleNo from vehicle  where active = 0 and branch_id = "${request.body.sessionInfo.branch}"`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    agencyimei(request) {
        try {
            let sqlQuery = `select id, imei_no AS imeiNo from device where active = 0`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    vehicleimei(request) {
        try {
            let sqlQuery = `select id, imei_no AS imeiNo from device where active = 0 and device_in = "${request.body.sessionInfo.branch}"`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    drivers(request) {
        try {
            let sqlQuery = `select id, name from profile where role='Driver' and branch_id = "${request.body.sessionInfo.branch}" `;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    owners(request) {
        try {
            let sqlQuery = `select id, name from profile where role='Owner' and branch_id = "${request.body.sessionInfo.branch}" `;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    paymenttypes(request) {
        try {
            let sqlQuery = `select id, name from app_data where code = 'PaymentType'`;
            let data = getEntityManager().query(sqlQuery);
            return data;
            //console.log(data);
            //return this.sth(request, this.branchmanager, "branch", ['id', 'name', 'title']);
        } catch (error) {
            return Promise.reject(error);
        }
    }

   
}    


   