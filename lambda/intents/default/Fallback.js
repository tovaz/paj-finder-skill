"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fallback = void 0;
const IntentHelper_1 = require("../../utilities/IntentHelper");
const Types_1 = require("../../utilities/Types");
const i18next_1 = __importDefault(require("i18next"));
exports.Fallback = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.Fallback);
    },
    handle(handlerInput) {
        const speechText = i18next_1.default.t('ERROR_MSG');
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(i18next_1.default.t('HELP_MSG'))
            .getResponse();
    },
};
//# sourceMappingURL=Fallback.js.map