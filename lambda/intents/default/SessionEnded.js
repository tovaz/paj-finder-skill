"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionEnded = void 0;
const IntentHelper_1 = require("../../utilities/IntentHelper");
const Types_1 = require("../../utilities/Types");
const i18next_1 = __importDefault(require("i18next"));
exports.SessionEnded = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsType(handlerInput, Types_1.RequestTypes.SessionEnded);
    },
    handle(handlerInput) {
        const speechText = i18next_1.default.t('GOODBYE_MSG');
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
            .getResponse();
    },
};
//# sourceMappingURL=SessionEnded.js.map