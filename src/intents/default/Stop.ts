import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IntentTypes } from '../../utils/Types';
import { IsIntent } from '../../utils/IntentHelper';
import i18n from 'i18next';

export const Stop: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
  },
  handle(handlerInput: HandlerInput) {
    const speechText = i18n.t('GOODBYE_MSG');

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .getResponse();
  },
};
