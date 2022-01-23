import * as Alexa from 'ask-sdk-core';
import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utilities/IntentHelper';
import { IntentTypes } from '../../utilities/Types';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';

export const DeviceIntent: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.DevicesIntent);
  },

  async handle(handlerInput: HandlerInput) {
    const session = new SessionService(handlerInput);
    const storage = new StorageService(handlerInput);
    const cusService = new CustomerService(handlerInput);

    const devices = await cusService.getDevices();
    let customer:any = await storage.get('customer');
    
    const device = Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME");
    const speechText = 'Your device is ' + device;
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
