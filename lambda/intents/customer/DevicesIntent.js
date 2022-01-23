"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesIntent = void 0;
const IntentHelper_1 = require("../../utilities/IntentHelper");
const Types_1 = require("../../utilities/Types");
const i18next_1 = __importDefault(require("i18next"));
const SessionService_1 = require("../../services/SessionService");
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
const sampleTemplate = __importStar(require("../../views/sample-apl.json"));
const sampleData = __importStar(require("../../views/sampleData.json"));
const DatasourceHelper_1 = require("../../utilities/DatasourceHelper");
exports.DevicesIntent = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.DevicesIntent);
    },
    async handle(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        const cusService = new CustomerService_1.CustomerService(handlerInput);
        const devices = await cusService.getDevices();
        let customer = await storage.get('customer');
        console.log('DEVICES');
        console.log(devices);
        let speechText = 'The last location of your devices is ' + customer.name + ' !';
        const datasource = DatasourceHelper_1.createDevicesDatasource(devices);
        console.log('HDS - LIST');
        console.log({ sampleTemplate, sampleData });
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .reprompt('What device do you want to select')
            .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: sampleTemplate,
            datasources: sampleData
        })
            .withShouldEndSession(false)
            .getResponse();
    },
};
//# sourceMappingURL=DevicesIntent.js.map