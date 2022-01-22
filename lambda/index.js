"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Alexa = __importStar(require("ask-sdk-core"));
const Launch_1 = require("./intents/Launch");
const Help_1 = require("./intents/Help");
const Stop_1 = require("./intents/Stop");
const Reflector_1 = require("./intents/Reflector");
const Fallback_1 = require("./intents/Fallback");
const HelloWorld_1 = require("./intents/HelloWorld");
const ErrorProcessor_1 = require("./errors/ErrorProcessor");
const SessionEnded_1 = require("./intents/SessionEnded");
const LocalizationRequestInterceptor_1 = require("./interceptors/LocalizationRequestInterceptor");
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
// Default intents
Launch_1.Launch, HelloWorld_1.HelloWorld, Help_1.Help, Stop_1.Stop, SessionEnded_1.SessionEnded, Reflector_1.Reflector, Fallback_1.Fallback)
    .addErrorHandlers(ErrorProcessor_1.ErrorProcessor)
    .addRequestInterceptors(LocalizationRequestInterceptor_1.LocalizationRequestInterceptor)
    .lambda();
//# sourceMappingURL=index.js.map