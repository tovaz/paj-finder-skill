import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { IsType } from '../../utils/IntentHelper';
import { RequestTypes } from '../../utils/Types';
import i18n from 'i18next';

export const SessionEnded: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsType(handlerInput, RequestTypes.SessionEnded);
  },
  handle(handlerInput: HandlerInput) {
    const speechText = i18n.t('Alexa.Goodbye');

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .getResponse();
  },
};
