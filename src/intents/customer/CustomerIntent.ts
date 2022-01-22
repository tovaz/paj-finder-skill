import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utilities/helpers';
import { IntentTypes, Strings } from '../../utilities/constants';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';

export const CustomerIntent: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.HelloWorld);
  },

  async handle(handlerInput: HandlerInput) {
    const session = new SessionService(handlerInput);
    // const cusService = new CustomerService(handlerInput);
    // cusService.getUserData().then( r => {

    // });
    const storage = new StorageService(handlerInput);
    let customer:any = await storage.get('customer');
    let speechText = 'Hi customer! your name is ' + customer.name;
    console.log('STORAGE CUSTOMER', customer);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t(Strings.SKILL_NAME), speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};
