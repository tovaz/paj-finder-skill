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
const IntentHelper_1 = require("../../utilities/IntentHelper");
const Types_1 = require("../../utilities/Types");
const i18next_1 = __importDefault(require("i18next"));
const SessionService_1 = require("../../services/SessionService");
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
const AddressHelper_1 = require("../../utilities/AddressHelper");
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
        const inputName = Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME");
        const device = devices.find((d) => d.name.toLowerCase().startsWith(inputName));
        let speechText = 'I couldnt found your device, please can you reapeat your finder device name ?';
        let text = speechText;
        if (device) {
            console.log('DEVICE');
            console.log(device);
            let lastLocation = await cusService.getLastPosition([device.id]);
            if (lastLocation) {
                lastLocation = lastLocation[0];
                let address = await cusService.getStreetAdrress(lastLocation.lat, lastLocation.lng);
                address = AddressHelper_1.getLogbookAddress(address.features[0].properties);
                speechText = 'The last location of ' + device.name + ' is <say-as interpret-as="address">' + address.address + '</say-as>';
                text = 'The last location of ' + device.name + ' is ' + address.address;
            }
            else {
                speechText = 'Sorry we cant find last location for ' + device.name;
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