import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utilities/IntentHelper';
import { IntentTypes } from '../../utilities/Types';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';
import * as listTemplate from '../../views/devices-list.json';
import { createDevicesDatasource } from '../../utilities/DatasourceHelper';

export const DevicesIntent: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.DevicesIntent);
  },

  async handle(handlerInput: HandlerInput) {
    const session = new SessionService(handlerInput);
    const storage = new StorageService(handlerInput);
    const cusService = new CustomerService(handlerInput);

    const devices = await cusService.getDevices();
    let customer:any = await storage.get('customer');

    console.log('DEVICES');
    console.log(devices);
    let speechText = 'The last location of your devices is ' + customer.name + ' !';
    const datasource = createDevicesDatasource(devices);

    console.log('LIST');
    console.log({ listTemplate, datasource });
    
    return handlerInput.responseBuilder
      .speak(speechText)
      //.withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .reprompt('What device do you want to select')
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: listTemplate,
        datasources: datasource
     })
      .withShouldEndSession(false)
      .getResponse();
  },
};
