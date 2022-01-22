import { HandlerInput } from "ask-sdk-core";
import { Session, User } from "ask-sdk-model";
import { ENV } from './../environments/environment';
import { SessionService } from "./SessionService";
import * as ddbAdapter from 'ask-sdk-dynamodb-persistence-adapter';
import AWS, * as aws from 'aws-sdk'

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

export class StorageService {
    session: SessionService = null;

    constructor (public hi: HandlerInput){
        this.session = new SessionService(hi);
    }

    async save(key:string, value:any){
        //_ Enable if use dynamonDB
        // let res:any = {};
        // res[key] = value;
        // this.session.attributesManager().setPersistentAttributes(res);

        this.session.attributes()[key] = value;
        //_ Only for dynamon storage
        //await this.session.attributesManager().savePersistentAttributes();
    }

    async get(key:string){
        //_ Enable if use dynamonDB
        // const attributes = await this.session.attributesManager().getPersistentAttributes() || {};

        return this.session.attributes()[key];
        //_ Only for dynamon storage
        //return  attributes[key]? attributes[key] : null;
    }
}