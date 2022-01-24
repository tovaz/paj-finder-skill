"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const HttpHelper_1 = require("../utils/HttpHelper");
const axios = require('axios').default;
class CustomerService extends HttpHelper_1.HttpHelper {
    constructor(hi) {
        super(hi);
        this.hi = hi;
    }
    async getCustomerData() {
        return axios.get('/api/customer/').then((res) => {
            if (res.status === 200)
                return res.data.success;
        }).catch((error) => {
            console.log(error);
        });
    }
    async getDevices() {
        return axios.get('/api/device').then((res) => {
            console.log(res);
            if (res.status === 200)
                return res.data.success;
        }).catch((error) => {
            console.log(error);
        });
    }
    async getLastPosition(listofIDs) {
        const postData = {
            deviceIDs: listofIDs
        };
        return axios.post('/api/trackerdata/getalllastpositions', postData).then((res) => {
            // console.log('LAST LOCATION RESPONSED');
            // console.log(res);
            if (res.status === 200)
                return res.data.success;
        }).catch((error) => {
            console.log(error);
        });
    }
    async getStreetAdrress(lat, lng) {
        //_ Language support for reverse geocoding
        let lang = 'en';
        const supportedLanguages = ['en', 'de', 'fr', 'it'];
        lang = supportedLanguages.includes(lang) ? '&lang=' + lang : '';
        return axios.get('/api/reverse/geocoding?lat=' + lat + '&lon=' + lng + lang).then((res) => {
            // console.log('LOCATION RESPONSE');
            // console.log(res);
            if (res.status === 200)
                return res.data.success;
        }).catch((error) => {
            console.log(error);
        });
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map