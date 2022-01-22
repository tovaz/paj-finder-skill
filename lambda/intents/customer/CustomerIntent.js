"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerIntent = void 0;
const helpers_1 = require("../../utilities/helpers");
const constants_1 = require("../../utilities/constants");
const i18next_1 = __importDefault(require("i18next"));
const SessionService_1 = require("../../services/SessionService");
const StorageService_1 = require("../../services/StorageService");
exports.CustomerIntent = {
    canHandle(handlerInput) {
        return helpers_1.IsIntent(handlerInput, constants_1.IntentTypes.HelloWorld);
    },
    async handle(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        // const cusService = new CustomerService(handlerInput);
        // cusService.getUserData().then( r => {
        // });
        const storage = new StorageService_1.StorageService(handlerInput);
        let customer = await storage.get('customer');
        let speechText = 'Hi customer! your name is ' + customer.name;
        console.log('STORAGE CUSTOMER', customer);
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t(constants_1.Strings.SKILL_NAME), speechText)
            .withShouldEndSession(false)
            .getResponse();
    },
};
//# sourceMappingURL=CustomerIntent.js.map