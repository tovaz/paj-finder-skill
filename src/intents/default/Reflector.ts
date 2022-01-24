import { RequestHandler, getIntentName, HandlerInput } from 'ask-sdk-core';
import { IsType } from '../../utils/IntentHelper';
import { RequestTypes } from '../../utils/Types';
import i18n from 'i18next';

export const Reflector: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsType(handlerInput, RequestTypes.Intent);
  },
  handle(handlerInput: HandlerInput) {
    const speechText = i18n.t('REFLECTOR_MSG', {
      intentName: getIntentName(handlerInput.requestEnvelope),
    });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
      .getResponse();
  },
};
