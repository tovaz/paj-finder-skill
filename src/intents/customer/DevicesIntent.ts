import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utils/IntentHelper';
import { IntentTypes } from '../../utils/Types';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';
import * as listTemplate from '../../views/devices-list.json';
import * as sampleTemplate from '../../views/sample-apl.json';
import * as sampleData from '../../views/sampleData.json';

import { createDevicesDatasource } from '../../utils/DatasourceHelper';

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

    console.log('HDS - LIST');
    console.log({ sampleTemplate, sampleData });
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
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
