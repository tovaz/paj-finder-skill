import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utilities/IntentHelper';
import { IntentTypes } from '../../utilities/Types';
import i18n from 'i18next';

export const Fallback: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.Fallback);
  },
  handle(handlerInput: HandlerInput) {
    const speechText = i18n.t('ERROR_MSG');

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(i18n.t('HELP_MSG'))
      .getResponse();
  },
};
