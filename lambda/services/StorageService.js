"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const SessionService_1 = require("./SessionService");
//_ Storage adapter
//_ Enable to use aws dynamo storage
// export const PersistentAdapter = new ddbAdapter.DynamoDbPersistenceAdapter({
//     tableName: 'skillData',
//     createTable: true,
//     dynamoDBClient: new AWS.DynamoDB({ 
//         apiVersion: 'latest', 
//         region: ENV.REGION,
//         credentials: {
//             accessKeyId: ENV.AWS_ACCESS_KEY,
//             secretAccessKey: ENV.AWS_SECRET_KEY
//         }
//     })
// });
class StorageService {
    constructor(hi) {
        this.hi = hi;
        this.session = null;
        this.session = new SessionService_1.SessionService(hi);
    }
    async save(key, value) {
        //_ Enable if use dynamonDB
        // let res:any = {};
        // res[key] = value;
        // this.session.attributesManager().setPersistentAttributes(res);
        this.session.attributes()[key] = value;
        //_ Only for dynamon storage
        //await this.session.attributesManager().savePersistentAttributes();
    }
    async get(key) {
        //_ Enable if use dynamonDB
        // const attributes = await this.session.attributesManager().getPersistentAttributes() || {};
        return this.session.attributes()[key];
        //_ Only for dynamon storage
        //return  attributes[key]? attributes[key] : null;
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=StorageService.js.map