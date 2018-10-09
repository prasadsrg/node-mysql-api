import { ProfileDAO } from "../../../src/repos/ProfileDAO";
import { AppMenuDAO } from "../../../src/repos/AccessMenuDAO";
import { BranchDAO } from "../../../src/repos/BranchDAO";
import { ProfileService } from "../../../server/services/ProfileService";
import { Profile } from "../../../src/models/Profile";

import { generate } from "randomstring";
import { hashSync, compareSync } from "bcryptjs";

import { App } from "../../../server/utils/App";
import { Props } from "../../../server/config/Props";

export class AuthService {
  public sessionInfo: any;
  private profileDAO: ProfileDAO;
  private appMenuDAO: AppMenuDAO;
  private profileService: ProfileService;
  private branchDAO: BranchDAO;
  private providers: any;
  private transporter: any;

  constructor() {
    this.profileDAO = new ProfileDAO();
    this.appMenuDAO = new AppMenuDAO();
    this.profileService = new ProfileService();
    this.branchDAO = new BranchDAO();
    this.providers = {
      email: "email",
      facebook: "facebook",
      google: "google",
      linkedin: "linkedin"
    };
    this.transporter = App.createEmailAccount();
  }

  retrieve(reqData: any) {
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
        .then(results => {
          return this.retrieve({
            email: reqData.userId,
            password: reqData.password,
            provider: "email"
          });
        })
        .catch(error => {
          return Promise.reject(error);
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async reteriveProfileDetails(userId: string) {
    try {
      var responseData: any = {};
      let query = {};
      if (typeof userId == "number" && userId > 9) {
        query = { mobile: userId };
      } else {
        query = { email: userId };
      }
      var accountObj: any = await this.profileDAO.findOne(query);
      if (accountObj != null) {
        responseData.user = {};
        responseData.user.id = accountObj.id;
        responseData.user.role = accountObj.role;
        responseData.user.name = accountObj.name;
        responseData.user.email = accountObj.email;
        responseData.user.mobile = accountObj.mobile;
        responseData.user.active = accountObj.active;
        responseData.user.branch = accountObj.branch.id;

        var menuAccessObj = await this.appMenuDAO.search({
          role: accountObj.role,
          active: accountObj.active
        });
        responseData.menuList = menuAccessObj;
        responseData.jwt = App.encodeJWT(responseData.user);
        responseData.decodejwt = App.decodeJWT(responseData.jwt);
        var branch: any = await this.branchDAO.entity(accountObj.branch.id);
        if (branch) {
          responseData.branch = {};
          responseData.branch.id = branch.id;
          responseData.branch.name = branch.name;
        } else {
          return Promise.reject({
            message: "Error in retreving menu access items "
          });
        }
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
  // async reteriveUserDetails(userId: string) {
  //     try {
  //         var responseData: any = {};
  //         let query = {};
  //         if(typeof(userId) == "number" && userId > 9){
  //             query = { mobile: userId, grpcode: this.sessionInfo.grpcode };
  //         }else {
  //             query = { email: userId, grpcode: this.sessionInfo.grpcode }
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
    var responseData: any = {};
    let query = {};
    if (typeof reqData.userId == "number" && reqData.userId > 9) {
      query = { mobile: reqData.userId };
    } else {
      query = { email: reqData.userId };
    }
    console.log(query);
    var profileObj: any = await this.profileDAO.findOne(query);
    if (profileObj == null) {
      return Promise.reject({ message: "Invalid Credientials" });
    } else {
      let auth = compareSync(reqData.password, profileObj.password);
      if (auth == true) {
        if (profileObj.active == true) {
          return this.reteriveProfileDetails(reqData.userId);
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
        email: reqData.userId
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
      let query = {};
      if (typeof reqData.userId == "number" && reqData.userId > 9) {
        query = { mobile: reqData.userId };
      } else {
        query = { email: reqData.userId };
      }
      //console.log(reqData)
      const uname = await this.profileDAO.findOne(query);
      //Generating Random Token
      if (uname == null || uname == undefined) {
        return Promise.reject("Not a Registered User");
      }
      const tok = generate({ length: 4, charset: "numeric" });
      console.log(tok);
      uname.passwordToken = tok;
      let data: any = await this.profileDAO.save(uname);
      const mailOptions = {
        from: '"Mee Truck" <elit.naveen@gmail.com>', // sender address
        to: uname.email, // list of receivers
        subject: "Password Reset Link", // Subject line
        //text: 'http://localhost:4200/auth/resetpassword/?t='+tok, // plain text body
        html: `<!DOCTYPE html>
                        <html>
                        <head>
                            <title>Password Reset</title>
                        </head>
                        <body>
                        <div style="background-color:#F9F9F9 ;width: 60%;height: 50%;padding-top: 3%;padding-bottom: 3%">
                        <div style="width: 50%;height: 30%;background-color:white;box-shadow:  3px 3px 10px #888888 ;padding: 40px;margin: auto;border-radius: 10px;">
                                <h1 style="text-align: center;font-family: 'Roboto', sans-serif;">MeeTruck</h1>
                                <p style="font-family: 'Roboto', sans-serif;line-height: 30px;">Hi ${
                                  data.name
                                },</p>
                            <p style="font-family: 'Roboto', sans-serif;line-height: 25px;">You told us you forgot your password. If you really did, Enter below OTP to choose a new password for Group code <br>
                                
                            
                            </p>
                            <h2 style="text-align:center"> ${tok} </h2>
                            <p>If you didn't mean to reset your password, then you can just ignore this email; your password will not change.</p>
                        </div>
                        </div>
                        </body>
                        </html>` // html body
      };
      if (data) {
        this.transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return Promise.reject(err);
          }
          console.log(info);
        });

        return Promise.resolve("Code has been sent to your Mail id");
      } else {
        return Promise.reject(
          "Technical issue in sending reset link, Sorry for Inconvience"
        );
      }
    } catch (error) {
      return Promise.reject(
        "Technical issue in sending reset link, Sorry for Inconvience"
      );
    }
  }

  async resetPassword(reqData: any) {
    try {
      let query = {};
      if (typeof reqData.userId == "number" && reqData.userId > 9) {
        query = { mobile: reqData.userId, passwordToken: reqData.token };
      } else {
        query = { email: reqData.userId, passwordToken: reqData.passwordToken };
      }
      // console.log(query)
      let data: any = await this.profileDAO.findOne(query);
      // console.log(data)
      if (data) {
        data.passwordToken = null;
        data.password = reqData.password;
        let newData: any = await this.profileDAO.save(data);
        return Promise.resolve("New Password Set Successfully");
      } else {
        return Promise.reject("Invalid Token");
      }
    } catch (error) {
      return Promise.reject(
        "Technical issue in Resetting Password, Sorry for Inconvience"
      );
    }
  }

  async changePassword(reqData: any) {
    try {
      console.log(reqData);
      let data: any = await this.profileDAO.entity(reqData.id);
      console.log(data);
      if (data) {
        let check = compareSync(reqData.oldPassword, data.password);
        console.log(check);
        if (check) {
          let pwd = hashSync(reqData.newPassword, 8);
          let newPassword = {
            id: reqData.id,
            password: pwd
          };
          console.log(newPassword);
          let newData: any = await this.profileDAO.save(newPassword);
          return Promise.resolve("New Password Set Successfully");
        } else {
          return Promise.reject("Invalid Password");
        }
      } else {
        return Promise.reject("Invalid User");
      }
    } catch (error) {
      return Promise.reject(
        "Technical issue in Resetting Password, Sorry for Inconvience"
      );
    }
  }
}
