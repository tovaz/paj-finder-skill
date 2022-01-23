"use strict";
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
exports.DevicesIntent = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.DevicesIntent);
    },
    async handle(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        const cusService = new CustomerService_1.CustomerService(handlerInput);
        cusService.getDevices();
        let customer = await storage.get('customer');
        let speechText = 'The last location of your devices is ' + customer.name + ' !';
        console.log('STORAGE CUSTOMER', customer);
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};
//# sourceMappingURL=DevicesIntent.js.map