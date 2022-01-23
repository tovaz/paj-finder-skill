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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesIntent = void 0;
const IntentHelper_1 = require("../../utilities/IntentHelper");
const Types_1 = require("../../utilities/Types");
const SessionService_1 = require("../../services/SessionService");
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
const listTemplate = __importStar(require("../../views/devices-list.json"));
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
        console.log('LIST');
        console.log({ listTemplate, datasource });
        return handlerInput.responseBuilder
            .speak(speechText)
            //.withSimpleCard(i18n.t('SKILL_NAME'), speechText)
            .reprompt('What device do you want to select')
            .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            document: listTemplate,
            datasources: datasource
        })
            .withShouldEndSession(false)
            .getResponse();
    },
};
//# sourceMappingURL=DevicesIntent.js.map