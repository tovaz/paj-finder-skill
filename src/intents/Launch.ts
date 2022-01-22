import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { RequestTypes, Strings } from '../utilities/constants';
import { IsType } from '../utilities/helpers';
import i18n from 'i18next';

export const Launch: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsType(handlerInput, RequestTypes.Launch);
  },
  handle(handlerInput: any) {
    const speechText = i18n.t('WELCOME_MSG');
    console.log('Speech Text', speechText);
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(i18n.t('WELCOME_MSG'), speechText)
      .getResponse();
  },
};
