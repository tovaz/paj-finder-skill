import * as Alexa from 'ask-sdk-core';
import { Launch } from './intents/default/Launch';
import { Help } from './intents/default/Help';
import { Stop } from './intents/default/Stop';
import { Reflector } from './intents/default/Reflector';
import { Fallback } from './intents/default/Fallback';
import { CustomerIntent } from './intents/customer/CustomerIntent';
import { ErrorProcessor } from './errors/ErrorProcessor';
import { SessionEnded } from './intents/default/SessionEnded';
import { LocalizationRequestInterceptor } from './interceptors/LocalizationRequestInterceptor';
import { SessionRequestInterceptor } from './interceptors/SessionRequestInterceptor';
import { DevicesIntent } from './intents/customer/DevicesIntent';
import { DeviceIntent } from './intents/customer/DeviceIntent';
//_ Enable to use dynamon db
//import { PersistentAdapter } from './services/StorageService';

export const handler = Alexa.SkillBuilders.custom()
  //_ Enable to use dynamon DB
  //.withPersistenceAdapter(PersistentAdapter)

  .addRequestHandlers(
    Launch,
    CustomerIntent,
    DevicesIntent,
    DeviceIntent,
    Help,
    Stop,
    SessionEnded,
    Fallback,
    Reflector
    
  )
  .addErrorHandlers(ErrorProcessor)
  .addRequestInterceptors(LocalizationRequestInterceptor, SessionRequestInterceptor )
  .lambda();
