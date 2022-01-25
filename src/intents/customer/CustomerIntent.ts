import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utils/IntentHelper';
import { IntentTypes } from '../../utils/Types';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';

export const CustomerIntent: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.CustomerIntent);
  },

  async handle(handlerInput: HandlerInput) {
    const session = new SessionService(handlerInput);
    const storage = new StorageService(handlerInput);
    let customer:any = await storage.get('customer');
    let speechText = i18n.t('CustomerIntent.Hi') + ' ' + customer.name + ' !';
    //console.log('STORAGE CUSTOMER', customer);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
