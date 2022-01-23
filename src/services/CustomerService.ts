import { HandlerInput } from "ask-sdk-core";
import { Session, User } from "ask-sdk-model";
import { HttpHelper } from "../utilities/HttpHelper";
import { ENV } from './../environments/environment';
import { SessionService } from "./SessionService";

const axios = require('axios').default;

export class CustomerService extends HttpHelper{
    
    constructor(public hi: HandlerInput){
        super(hi);
    }

    public async getCustomerData(){
        return await axios.get('/api/customer/').then( (res:any) => {
            if (res.status == 200)
                return res.data.success;
        }).catch( (error:any) => {
            console.log(error);
        });
    }

    public async getDevices(){
        return await axios.get('/api/device').then( (res:any) => {
            console.log('DEVICES RESPONSED');
            console.log(res);
            if (res.status == 200)
                return res.data.success;
        }).catch( (error:any) => {
            console.log(error);
        });
    }
}