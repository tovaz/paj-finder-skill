import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';
import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { RequestTypes } from '../../utilities/Types';
import { IsType } from '../../utilities/IntentHelper';
import i18n from 'i18next';

export const Launch: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsType(handlerInput, RequestTypes.Launch);
  },
  async handle(handlerInput: HandlerInput) {
    const cusService = new CustomerService(handlerInput);
    const storage = new StorageService(handlerInput);

    const customer = await cusService.getCustomerData();
    storage.save('customer', customer);

    const speechText =  i18n.t('WELCOME_MSG') + ' <break time="0.5s"/> ' + i18n.t('HELP_MSG');
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard(i18n.t('WELCOME_MSG'), i18n.t('HELP_MSG'), 'https://v2.finder-portal.com/assets/brand/img/logo_main.png', 'https://v2dev.finder-portal.com/assets/brand/img/logo_main.png')
      //.withSimpleCard(i18n.t('WELCOME_MSG'), speechText)
      .getResponse();
  },
};
