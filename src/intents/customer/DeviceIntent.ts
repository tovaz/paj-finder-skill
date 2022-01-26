import * as Alexa from 'ask-sdk-core';
import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utils/IntentHelper';
import { IntentTypes } from '../../utils/Types';
import i18n from 'i18next';
import { SessionService } from '../../services/SessionService';
import { CustomerService } from '../../services/CustomerService';
import { StorageService } from '../../services/StorageService';
import { getLogbookAddress } from '../../utils/AddressHelper';
import { createDeviceNameSlots } from '../../utils/SlotsHelper';

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
    
    console.log('UNDEFINED SLOT');
    console.log(Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME"));

    const inputName = Alexa.getSlotValue(handlerInput.requestEnvelope, "DEVICE_NAME");
    let device = null;
    console.log('INPUT NAME');
    console.log(inputName);

    if (inputName)
      device = devices.find((d:any) => d.name.toLowerCase().startsWith(inputName))
    
    let speechText = i18n.t('DeviceIntent.SlotNotFound');
    let text = speechText;
    if (device){
        console.log('DEVICE');
        console.log(device);
        let lastLocation = await cusService.getLastPosition([device.id]);
        if (lastLocation.length > 0){
            lastLocation = lastLocation[0];
            let address:any = await cusService.getStreetAdrress(lastLocation.lat, lastLocation.lng);
            address = getLogbookAddress(address.features[0].properties);
            speechText = i18n.t('DeviceIntent.LastLocation', { DEVICE: device.name } ) + ' <say-as interpret-as="address">' + address.address + '</say-as>';
            text = i18n.t('DeviceIntent.LastLocation', { DEVICE: device.name } ) + address.address;
        }
        else{
            speechText = i18n.t('DeviceIntent.CantFindLocation', { DEVICE: device.name } );
            text = speechText;
        }

        return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(i18n.t('SKILL_NAME'), text)
        .withShouldEndSession(false)
        .getResponse();
    }  
    else{
        const slotDevices = createDeviceNameSlots(devices);
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
        .withShouldEndSession(false)
        .addDirective(slotDevices)
        .getResponse();
    }

    
  },
};
