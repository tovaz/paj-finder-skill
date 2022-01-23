import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { RequestTypes } from '../../utilities/Types';
import { IsType } from '../../utilities/IntentHelper';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';

export const Launch: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsType(handlerInput, RequestTypes.Launch);
  },
  async handle(handlerInput: any) {
    const session = new SessionService(handlerInput);
    const cusService = new CustomerService(handlerInput);
    const storage = new StorageService(handlerInput);

    const customer = await cusService.getCustomerData();
    storage.save('customer', customer);

    const speechText =  i18n.t('WELCOME_MSG');
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(i18n.t('WELCOME_MSG'), speechText)
      .getResponse();
  },
};
