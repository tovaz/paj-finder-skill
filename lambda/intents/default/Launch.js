"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launch = void 0;
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
const Types_1 = require("../../utils/Types");
const IntentHelper_1 = require("../../utils/IntentHelper");
const i18next_1 = __importDefault(require("i18next"));
const SlotsHelper_1 = require("../../utils/SlotsHelper");
exports.Launch = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsType(handlerInput, Types_1.RequestTypes.Launch);
    },
    async handle(handlerInput) {
        const cusService = new CustomerService_1.CustomerService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        //_ Storage customer data into session atributes
        const customer = await cusService.getCustomerData();
        storage.save('customer', { id: customer.id, name: customer.name, email: customer.email });
        //_ Create custom slot values for device name used in Device Intent
        let devices = await cusService.getDevices();
        const slotDevices = SlotsHelper_1.createDeviceNameSlots(devices);
        const SlotDirective = {
            type: "Dialog.UpdateDynamicEntities",
            updateBehavior: "REPLACE",
            types: [
                {
                    name: "DEVICES_NAME",
                    values: slotDevices
                }
            ]
        };
        const speechText = i18next_1.default.t('Alexa.Welcome') + ' <break time="0.5s"/> ' + i18next_1.default.t('Alexa.Help');
        const welcomeText = i18next_1.default.t('Alexa.Welcome').replace('Pai', 'Paj'); //_ Change pai to paj :: used pai to speak like the brand name
        console.log('DATA', { speechText, welcomeText });
        let response = handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt(i18n.t('Alexa.Help'))
            .withStandardCard(welcomeText, i18next_1.default.t('Alexa.Help'), 'https://v2.finder-portal.com/assets/brand/img/logo_main.png')
            .addDirective(SlotDirective)
            .getResponse();
        console.log('RESPONSE', response);
        return response;
    },
};
//# sourceMappingURL=Launch.js.map