"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerIntent = void 0;
const IntentHelper_1 = require("../../utils/IntentHelper");
const Types_1 = require("../../utils/Types");
const i18next_1 = __importDefault(require("i18next"));
const SessionService_1 = require("../../services/SessionService");
const StorageService_1 = require("../../services/StorageService");
exports.CustomerIntent = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.CustomerIntent);
    },
    async handle(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        let customer = await storage.get('customer');
        let speechText = 'Hi ' + customer.name + ' !';
        console.log('STORAGE CUSTOMER', customer);
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};
//# sourceMappingURL=CustomerIntent.js.map