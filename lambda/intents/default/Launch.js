"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launch = void 0;
const Types_1 = require("../../utilities/Types");
const IntentHelper_1 = require("../../utilities/IntentHelper");
const i18next_1 = __importDefault(require("i18next"));
const SessionService_1 = require("../../services/SessionService");
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
exports.Launch = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsType(handlerInput, Types_1.RequestTypes.Launch);
    },
    async handle(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        const cusService = new CustomerService_1.CustomerService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        const customer = await cusService.getCustomerData();
        storage.save('customer', customer);
        const speechText = i18next_1.default.t('WELCOME_MSG');
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(i18next_1.default.t('WELCOME_MSG'), speechText)
            .getResponse();
    },
};
//# sourceMappingURL=Launch.js.map