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

    async getCustomerData(){
        return axios.get('/api/customer/').then( (res:any) => {
            if (res.status === 200)
                return res.data.success;
        }).catch( (error:any) => {
            console.log(error);
        });
    }

    async getDevices(){
        return axios.get('/api/device').then( (res:any) => {
            console.log('DEVICES RESPONSED');
            console.log(res);
            if (res.status === 200) 
                return res.data.success;
        }).catch( (error:any) => {
            console.log(error);
        });
    }

    async getLastPosition(listofIDs: Array<any>){
        const postData = {
            deviceIDs: listofIDs
        };

        return axios.post('/api/trackerdata/getalllastpositions', postData).then( (res:any) => {
            console.log('LAST LOCATION RESPONSED');
            console.log(res);
            if (res.status === 200) 
                return res.data.success;
        }).catch( (error:any) => {
            console.log(error);
        });
    }

    async getStreetAdrress(lat: any, lng: any) {
        //_ Language support for reverse geocoding
        let lang = 'en';
        const supportedLanguages = ['en', 'de', 'fr', 'it'];
        lang = supportedLanguages.includes(lang) ? '&lang=' + lang : '';
    
        return axios.get('/api/reverse/geocoding?lat=' + lat + '&lon=' + lng + lang).then( (res:any) => {
            console.log('LOCATION RESPONSE');
            console.log(res);
            if (res.status === 200) 
                return res.data.success;
        }).catch( (error:any) => {
            console.log(error);
        });
      }
}