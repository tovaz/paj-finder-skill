"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = void 0;
const IntentHelper_1 = require("../../utils/IntentHelper");
const Types_1 = require("../../utils/Types");
const i18next_1 = __importDefault(require("i18next"));
exports.Help = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.Help);
    },
    handle(handlerInput) {
        const speechText = i18next_1.default.t('Alexa.Help');
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .getResponse();
    },
};
//# sourceMappingURL=Help.js.map