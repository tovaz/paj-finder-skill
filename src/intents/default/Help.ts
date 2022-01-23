import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsIntent } from '../../utilities/IntentHelper';
import { IntentTypes } from '../../utilities/Types';
import i18n from 'i18next';

export const Help: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.Help);
  },
  handle(handlerInput: HandlerInput) {
    const speechText = i18n.t('HELP_MSG');

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .getResponse();
  },
};
