import { ProfileDAO } from "../repos/ProfileDAO";
import { AccessMenuDAO } from "../repos/AccessMenuDAO";
import { BranchDAO } from "../repos/BranchDAO";
import { ProfileService } from "./ProfileService";

import { generate } from "randomstring";
import { hashSync, compareSync } from "bcryptjs";

import { App } from "../..//utils/App";
import { Props } from "../../utils/Props";

export class AuthService {
  public sessionInfo: any;
  private profileDAO: ProfileDAO;
  private accessMenuDAO: AccessMenuDAO;
  private profileService: ProfileService;
  private branchDAO: BranchDAO;
  private providers: any;
  private transporter: any;

  constructor() {
    this.profileDAO = new ProfileDAO();
    this.accessMenuDAO = new AccessMenuDAO();
    this.profileService = new ProfileService();
    this.branchDAO = new BranchDAO();
    this.providers = {
      email: "email",
      facebook: "facebook",
      google: "google",
      linkedin: "linkedin"
    };
    this.transporter = App.CreateEmailAccount();
  }

  retrieve(reqData: any): any {
    switch (reqData.provider) {
      case "email": {
        return this.sendEmailResponse(reqData);
      }
      case "facebook": {
        return this.sendSocailResponse(reqData);
      }
      case "google": {
        return this.sendSocailResponse(reqData);
      }
      case "linkedin": {
        return this.sendSocailResponse(reqData);
      }
      default: {
        return this.sendEmailResponse(reqData);
      }
    }
  }

  async signup(reqData: any) {
    const newAccount: any = {};
    newAccount.id = null;
    newAccount.role = "User";
    newAccount.branch = await this.branchDAO.findOne({ isMain: true });
    newAccount.password = "0000";
    newAccount.address = {};
    newAccount.img = {};
    newAccount.email = reqData.email;
    if (reqData.password) {
      newAccount.password = reqData.password;
    }
    if (reqData.name) {
      newAccount.name = reqData.name;
    } else {
      newAccount.name = reqData.email.substring(0, reqData.email.indexOf("@"));
    }
    try {
      return this.profileService
        .save(newAccount)
        .then(() => {
          return this.retrieve({
            email: reqData.userid,
            password: reqData.password,
            provider: "email"
          });
        })
        .catch((error: any) => {
          return Promise.reject(error);
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async reteriveProfileDetails(userid: any) {
    try {
      var responseData: any = {};
      let query = { id: userid };

      var accountObj: any = await this.profileDAO.findOne(query);
      if (accountObj != null) {
        responseData.user = {};
        responseData.user.id = accountObj.id;
        responseData.user.role = accountObj.role;
        responseData.user.name = accountObj.name;
        responseData.user.email = accountObj.email;
        responseData.user.mobile = accountObj.mobile;
        responseData.user.active = accountObj.active;
        responseData.user.vid = accountObj.vid;
        responseData.user.branch_id = accountObj.branch.id;

        // var menuAccessObj = await this.accessMenuDAO.search({
        //   role: accountObj.role,
        //   active: accountObj.active
        // });
        // responseData.menuList = menuAccessObj;
        responseData.access_token = App.EncodeJWT(responseData.user);
        //responseData.decodejwt = App.decodeJWT(responseData.jwt);
        // var branch: any = await this.branchDAO.findOne(accountObj.branch.id);
        // if (branch) {
        //   responseData.branch = {};
        //   responseData.branch.id = branch.id;
        //   responseData.branch.name = branch.name;
        // } else {
        //   return Promise.reject({
        //     message: "Error in retreving menu access items "
        //   });
        // }
      } else {
        return Promise.reject({
          message: "Didn't find any profile with the provided email "
        });
      }
      return Promise.resolve(responseData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //User Login Details
  // async reteriveUserDetails(userid: string) {
  //     try {
  //         var responseData: any = {};
  //         let query = {};
  //         if(typeof(userid) == "number" && userid > 9){
  //             query = { mobile: userid, grpcode: this.sessionInfo.grpcode };
  //         }else {
  //             query = { email: userid, grpcode: this.sessionInfo.grpcode }
  //         }
  //         var accountObj: any = await this.profileDAO.findOne(query);
  //         if (accountObj != null) {
  //             responseData.user = {};
  //             responseData.user.id = accountObj.id;
  //             responseData.user.role = accountObj.role;
  //             responseData.user.name = accountObj.name;
  //             responseData.user.email = accountObj.email;
  //             responseData.user.mobile = accountObj.mobile;
  //             responseData.user.grpcode = accountObj.grpcode;

  //             var menuAccessObj = await this.appMenuDAO.search({ role: accountObj.role, grpcode: this.sessionInfo.grpcode});
  //             responseData.menuList = menuAccessObj;
  //             // if (menuAccessObj != null) {
  //             //     menuAccessObj.forEach((element: any) => {
  //             //         responseData.menuList.push(element.link);
  //             //     });
  //             // }
  //             responseData.jwt = App.encodeJWT(responseData.user);
  //             responseData.decodejwt = App.decodeJWT(responseData.jwt);
  //             var branch: any = await this.branchDAO.entity(accountObj.branch.id);
  //             if (branch) {
  //                 responseData.branch = {};
  //                 responseData.branch.id = branch.id;
  //                 responseData.branch.name = branch.name;
  //             } else {
  //                 return Promise.reject({ message: "Error in retreving menu access items " });
  //             }
  //         }
  //         else {
  //             return Promise.reject({ message: "Didn't find any profile with the provided email " });
  //         }
  //         return Promise.resolve(responseData);
  //     }
  //     catch (error) {
  //         return Promise.reject(error);
  //     }
  // }

  async sendEmailResponse(reqData: any) {
    let isVid: boolean = true;
    let dataList = reqData.username.split("-");
    if (dataList.length > 1) {
      reqData.vid = dataList[0];
      reqData.userid = dataList[1];
    } else {
      isVid = false;
      reqData.userid = reqData.username;
    }

    var responseData: any = {};
    let query: any = {};
    if (!isNaN(reqData.userid) && reqData.userid > 9) {
      query = { mobile: reqData.userid };
    } else {
      query = { email: reqData.userid };
    }
    if (isVid) {
      query["vid"] = reqData.vid;
    }

    console.log(query);
    var profileObj: any = await this.profileDAO.findOne(query);
    if (profileObj == null) {
      return Promise.reject({ message: "Invalid Credientials" });
    } else {
      if (profileObj.id.indexOf("SUPER_ADMIN") > -1) {
        profileObj.password = hashSync(profileObj.password, 8);
      }
      console.log(profileObj);
      // console.log(reqData.password)
      let auth = compareSync(reqData.password, profileObj.password);
      if (auth == true) {
        if (profileObj.active == true) {
          return this.reteriveProfileDetails(profileObj.id);
        } else {
          return Promise.reject({
            message: "Account De-activated Contact Admin"
          });
        }
      } else {
        return Promise.reject({ message: "Invalid Credientials" });
      }
    }
  }

  async sendSocailResponse(reqData: any) {
    try {
      var responseData: any = {};
      var profileObj: any = await this.profileDAO.search({
        email: reqData.userid
      });
      profileObj = profileObj[0];
      if (profileObj != null) {
        return this.reteriveProfileDetails(reqData.email);
      } else {
        return this.signup(reqData);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async forgotPassword(reqData: any) {
    try {
      let query: any = {};
      if (!isNaN(reqData.userid) && reqData.userid > 9) {
        query = { mobile: reqData.userid };
      } else {
        query = { email: reqData.userid };
      }
      if (reqData.vid) {
        query.vid = reqData.vid;
      }
      console.log(query);
      const uname = await this.profileDAO.findOne(query);
      //Generating Random Token
      if (uname == null || uname == undefined) {
        return Promise.reject("Not a Registered User");
      }
      console.log(uname);
      const tok = generate({ length: 4, charset: "numeric" });
      console.log(tok);
      uname.token = tok;
      let data: any = await this.profileDAO.save(uname);
      const mailOptions = {
        from: '"DFF Tech" <dfftech@gmail.com>', // sender address
        to: uname.email, // list of receivers
        subject: "Password Reset Link", // Subject line
        //text: 'http://localhost:4200/auth/resetpassword/?t='+tok, // plain text body
        html: App.HtmlRender("OtpSend", { data: { name: uname.name, token: uname.token } }) // html body
      };
      if (data) {
        this.transporter.sendMail(mailOptions, (err: any, info: any) => {
          if (err) {
            return Promise.reject(err);
          }
          console.log(info);
        });

        return Promise.resolve("Code has been sent to your Mail id");
      } else {
        return Promise.reject("Technical issue in sending reset link, Sorry for Inconvience");
      }
    } catch (error) {
      return Promise.reject("Technical issue in sending reset link, Sorry for Inconvience");
    }
  }

  async resetPassword(reqData: any) {
    try {
      let query: any = {};
      if (!isNaN(reqData.userid) && reqData.userid > 9) {
        query = { mobile: reqData.userid, token: reqData.token };
      } else {
        query = { email: reqData.userid, token: reqData.token };
      }
      if (reqData.vid) {
        query.vid = reqData.vid;
      }
      let data: any = await this.profileDAO.findOne(query);
      // console.log(data)
      if (data) {
        data.token = null;
        data.password = hashSync(reqData.password, 8);
        let newData: any = await this.profileDAO.save(data);
        return Promise.resolve("New Password Set Successfully");
      } else {
        return Promise.reject("Invalid Token");
      }
    } catch (error) {
      return Promise.reject("Technical issue in Resetting Password, Sorry for Inconvience");
    }
  }
}
