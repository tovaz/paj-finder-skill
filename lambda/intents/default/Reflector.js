"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflector = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const IntentHelper_1 = require("../../utilities/IntentHelper");
const Types_1 = require("../../utilities/Types");
const i18next_1 = __importDefault(require("i18next"));
exports.Reflector = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsType(handlerInput, Types_1.RequestTypes.Intent);
    },
    handle(handlerInput) {
        const speechText = i18next_1.default.t('REFLECTOR_MSG', {
            intentName: ask_sdk_core_1.getIntentName(handlerInput.requestEnvelope),
        });
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .getResponse();
    },
};
//# sourceMappingURL=Reflector.js.map