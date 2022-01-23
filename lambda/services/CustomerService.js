"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const HttpHelper_1 = require("../utilities/HttpHelper");
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
            console.log('DEVICES RESPONSED');
            console.log(res);
            if (res.status === 200)
                return res.data.success;
        }).catch((error) => {
            console.log(error);
        });
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map