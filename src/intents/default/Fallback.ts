import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utils/IntentHelper';
import { IntentTypes } from '../../utils/Types';
import i18n from 'i18next';

export const Fallback: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.Fallback);
  },
  handle(handlerInput: HandlerInput) {
    const speechText = i18n.t('Alexa.Error');

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(i18n.t('Alexa.Help'))
      .getResponse();
  },
};
