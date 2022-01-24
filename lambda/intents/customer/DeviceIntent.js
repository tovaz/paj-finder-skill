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
exports.DeviceIntent = void 0;
const Alexa = __importStar(require("ask-sdk-core"));
const IntentHelper_1 = require("../../utils/IntentHelper");
const Types_1 = require("../../utils/Types");
const i18next_1 = __importDefault(require("i18next"));
const SessionService_1 = require("../../services/SessionService");
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
const AddressHelper_1 = require("../../utils/AddressHelper");
exports.DeviceIntent = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsIntent(handlerInput, Types_1.IntentTypes.DeviceIntent);
    },
    async handle(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        const cusService = new CustomerService_1.CustomerService(handlerInput);
        const devices = await cusService.getDevices();
        let customer = await storage.get('customer');
        console.log('UNDEFINED SLOT');
        console.log(Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME"));
        const inputName = Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME");
        let device = null;
        console.log('INPUT NAME');
        console.log(inputName);
        if (inputName)
            device = devices.find((d) => d.name.toLowerCase().startsWith(inputName));
        let speechText = i18next_1.default.t('DeviceIntent.SlotNotFound');
        let text = speechText;
        if (device) {
            console.log('DEVICE');
            console.log(device);
            let lastLocation = await cusService.getLastPosition([device.id]);
            if (lastLocation.length > 0) {
                lastLocation = lastLocation[0];
                let address = await cusService.getStreetAdrress(lastLocation.lat, lastLocation.lng);
                address = AddressHelper_1.getLogbookAddress(address.features[0].properties);
                speechText = i18next_1.default.t('DeviceIntent.LastLocation', { values: { DEVICE: device.name } }) + ' <say-as interpret-as="address">' + address.address + '</say-as>';
                text = i18next_1.default.t('DeviceIntent.LastLocation', { values: { DEVICE: device.name } }) + address.address;
            }
            else {
                speechText = i18next_1.default.t('DeviceIntent.CantFindLocation', { values: { DEVICE: device.name } });
                text = speechText;
            }
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(i18next_1.default.t('SKILL_NAME'), text)
                .withShouldEndSession(false)
                .getResponse();
        }
        else {
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .withSimpleCard(i18next_1.default.t('SKILL_NAME'), speechText)
                .withShouldEndSession(false)
                .getResponse();
        }
    },
};
//# sourceMappingURL=DeviceIntent.js.map