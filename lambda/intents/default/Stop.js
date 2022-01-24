"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stop = void 0;
const Types_1 = require("../../utils/Types");
const IntentHelper_1 = require("../../utils/IntentHelper");
const i18next_1 = __importDefault(require("i18next"));
exports.Stop = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.Stop, Types_1.IntentTypes.Cancel);
    },
    handle(handlerInput) {
        const speechText = i18next_1.default.t('Alexa.Goodbye');
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .getResponse();
    },
};
//# sourceMappingURL=Stop.js.map