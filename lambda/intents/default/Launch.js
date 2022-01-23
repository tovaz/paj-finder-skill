"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launch = void 0;
const CustomerService_1 = require("../../services/CustomerService");
const StorageService_1 = require("../../services/StorageService");
const Types_1 = require("../../utilities/Types");
const IntentHelper_1 = require("../../utilities/IntentHelper");
const i18next_1 = __importDefault(require("i18next"));
const SlotsHelper_1 = require("../../utilities/SlotsHelper");
exports.Launch = {
    canHandle(handlerInput) {
        return IntentHelper_1.IsType(handlerInput, Types_1.RequestTypes.Launch);
    },
    async handle(handlerInput) {
        const cusService = new CustomerService_1.CustomerService(handlerInput);
        const storage = new StorageService_1.StorageService(handlerInput);
        //_ Storage customer data into session atributes
        const customer = await cusService.getCustomerData();
        storage.save('customer', customer);
        //_ Create custom slot values for device name used in Device Intent
        let devices = await cusService.getDevices();
        const slotDevices = SlotsHelper_1.createDeviceNameSlots(devices);
        const SlotDirective = {
            type: "Dialog.UpdateDynamicEntities",
            updateBehavior: "REPLACE",
            types: [
                {
                    "name": "Devices_Name",
                    "values": slotDevices
                }
            ]
        };
        const speechText = i18next_1.default.t('WELCOME_MSG') + ' <break time="0.5s"/> ' + i18next_1.default.t('HELP_MSG');
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withStandardCard(i18next_1.default.t('WELCOME_MSG'), i18next_1.default.t('HELP_MSG'), 'https://v2.finder-portal.com/assets/brand/img/logo_main.png', 'https://v2dev.finder-portal.com/assets/brand/img/logo_main.png')
            .addDirective(SlotDirective)
            .getResponse();
    },
};
//# sourceMappingURL=Launch.js.map