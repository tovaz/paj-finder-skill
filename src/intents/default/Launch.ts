import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';
import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { RequestTypes } from '../../utilities/Types';
import { IsType } from '../../utilities/IntentHelper';
import i18n from 'i18next';
import { createDeviceNameSlots } from '../../utilities/SlotsHelper';
import { Directive } from 'ask-sdk-model';

export const Launch: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsType(handlerInput, RequestTypes.Launch);
  },
  async handle(handlerInput: HandlerInput) {
    const cusService = new CustomerService(handlerInput);
    const storage = new StorageService(handlerInput);

    //_ Storage customer data into session atributes
    const customer = await cusService.getCustomerData();
    storage.save('customer', customer);

    //_ Create custom slot values for device name used in Device Intent
    let devices = await cusService.getDevices();
    const slotDevices = createDeviceNameSlots(devices);
    const SlotDirective: Directive = {
      type: "Dialog.UpdateDynamicEntities",
      updateBehavior: "REPLACE",
      types: [
          {
              name: "DEVICES_NAME",
              values: slotDevices
          }
      ]
  };
    
    const speechText =  i18n.t('WELCOME_MSG') + ' <break time="0.5s"/> ' + i18n.t('HELP_MSG');
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(i18n.t('WELCOME_MSG'), i18n.t('HELP_MSG'), 'https://v2.finder-portal.com/assets/brand/img/logo_main.png', 'https://v2dev.finder-portal.com/assets/brand/img/logo_main.png')
      .addDirective(SlotDirective)
      .getResponse();
  },
};
