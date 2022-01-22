"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsType = exports.IsIntent = void 0;
const constants_1 = require("./constants");
/**
 * Checks if the request matches any of the given intents.
 *
 * @param handlerInput
 * @param intents
 */
function IsIntent(handlerInput, ...intents) {
    if (handlerInput.requestEnvelope.request.type === constants_1.RequestTypes.Intent) {
        for (let i = 0; i < intents.length; i++) {
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}
exports.IsIntent = IsIntent;
/**
 * Checks if the request matches any of the given types.
 *
 * @param handlerInput
 * @param types
 */
function IsType(handlerInput, ...types) {
    for (let i = 0; i < types.length; i++) {
        if (handlerInput.requestEnvelope.request.type === types[i]) {
            return true;
        }
    }
    return false;
}
exports.IsType = IsType;
//# sourceMappingURL=helpers.js.map