"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHelper = void 0;
const environment_1 = require("../environments/environment");
const axios = require('axios').default;
class HttpHelper {
    constructor(hi) {
        //this.token = hi.attributesManager.getSessionAttributes()['accessToken'];
        //_ Configure request globally
        this.hi = hi;
        this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5IiwianRpIjoiMDFhN2FkNWNhMGFkZTIzNjJjMTY4OTI4MzFjODBiNmEyZmE3MmY1ZDVmYmFmZGE5NDExYTE3YjYyNjJkNmFkZDU0NjZlNzE3Njg5MDcyZmYiLCJpYXQiOjE2NDE4OTAzNzUuMDk3NzI4LCJuYmYiOjE2NDE4OTAzNzUuMDk3NzMyLCJleHAiOjE2NDQ0ODIzNzUuMDkwODU0LCJzdWIiOiIyNjk0OSIsInNjb3BlcyI6W119.VPqGnhW7xn-a3oBgp94ME1fzLHgt_KX_sFY23BsiyDQ1yc0mJZ4Ek0uYI0Hfrzs81LY502vRnVfKb-x68TuBjsYT6oN-HK2ZqPO6qGuFQNq61uLVUbC_CQf-KIlUUUty0qjIhCne7ZoRVCez3-sOAUYdHwOtVBHg0NNAG4iv3BJey251w2qgrl9lsq5Jjo6maAnIKEkzHWL2emUpJ3M22iL4yaEQcD0Q4ZU6-uhglb2M2TsWlaI_rnMNtlo0hSIr0og_lnyrj4x958Rgk4pkM61V45G5n1ZIi_pcP4hvLFelcYpTMZZapd0oY5gYekM1gDMRJhhw1OvO2992UIZcZqj4K4WGMDyY959Bt5_bMu5K_pYqBOe_Y_TkK4Ehcc7V1UxfDg02XYL3D73zzVcbmtNn-kQLsvMA0qNWfBfWZBEFtvL1HXL7DO2S6udPKmOP9CCzXm8CS2aIVp7r7Hg000VxaiO-y6No-RIRhGTe2ngv2mif1t9axkCmaeoYvFrktPj6fHmygkTYWmEHWjx0w1WtdctMCO0ejAZfzrhnEiTo0Ic0WAQrPH-Uw4SZFlOe-MmERb5MAiKe6PUyRxSP49XMRjJGf341gh8wJk59JxW30xvIAHLErvDhc9ewgwZHw_CD-Q2_91SLv_xIk_xQ3l-4_lSS0SBdkuq7GrGWHKk';
        axios.defaults.baseURL = environment_1.ENV.ROUTE;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
    }
}
exports.HttpHelper = HttpHelper;
//# sourceMappingURL=HttpHelper.js.map