import * as Alexa from 'ask-sdk-core';
import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utilities/IntentHelper';
import { IntentTypes } from '../../utilities/Types';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';
import { getLogbookAddress } from '../../utilities/AddressHelper';

export const DeviceIntent: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.DeviceIntent);
  },

  async handle(handlerInput: HandlerInput) {
    const session = new SessionService(handlerInput);
    const storage = new StorageService(handlerInput);
    const cusService = new CustomerService(handlerInput);

    const devices = await cusService.getDevices();
    let customer:any = await storage.get('customer');
    
    const inputName = Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME");
    const device = devices.find((d:any) => d.name.toLowerCase().startsWith(inputName))

    let speechText = 'I couldnt found your device, please can you reapeat your finder device name ?';
    let text = speechText;
    if (device){
        console.log('DEVICE');
        console.log(device);
        let lastLocation = await cusService.getLastPosition([device.id]);
        if (lastLocation){
            lastLocation = lastLocation[0];
            let address:any = await cusService.getStreetAdrress(lastLocation.lat, lastLocation.lng);
            address = getLogbookAddress(address.features[0].properties);
            speechText = 'The last location of ' + device.name + ' is <say-as interpret-as="address">' + address.address + '</say-as>';
            text = 'The last location of ' + device.name + ' is ' + address.address;
        }
        else{
            speechText = 'Sorry we cant find last location for ' + device.name;
            text = speechText;
        }

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(i18n.t('SKILL_NAME'), text)
        .withShouldEndSession(false)
        .getResponse();
    }  
    else{
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
        .withShouldEndSession(false)
        .getResponse();
    }

    
  },
};
