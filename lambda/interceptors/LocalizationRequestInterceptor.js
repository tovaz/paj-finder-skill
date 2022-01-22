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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationRequestInterceptor = void 0;
const sprintf = __importStar(require("i18next-sprintf-postprocessor"));
const i18next_1 = __importDefault(require("i18next"));
const en_json_1 = __importDefault(require("./../assets/translations/en.json"));
const es_json_1 = __importDefault(require("./../assets/translations/es.json"));
const de_json_1 = __importDefault(require("./../assets/translations/de.json"));
/**
 * Adds translation functions to the RequestAttributes.
 */
exports.LocalizationRequestInterceptor = {
    process(handlerInput) {
        const resources = {
            en: { translation: en_json_1.default },
            es: { translation: es_json_1.default },
            de: { translation: de_json_1.default },
        };
        const localizationClient = i18next_1.default.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            fallbackLng: 'en',
            resources,
            returnObjects: true,
        });
        // localizationClient.localize = () => {
        //   const args = arguments;
        //   const values = [];
        //   for (let i = 1; i < args.length; i++) {
        //     values.push(args[i]);
        //   }
        //   const value = i18n.t(args[0], {
        //     returnObjects: true,
        //     postProcess: 'sprintf',
        //     sprintf: values,
        //   });
        //   if (Array.isArray(value)) {
        //     return value[Math.floor(Math.random() * value.length)];
        //   } else {
        //     return value;
        //   }
        // };
    },
};
