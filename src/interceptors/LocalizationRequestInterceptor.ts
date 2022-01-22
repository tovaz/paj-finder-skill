import { HandlerInput, RequestInterceptor } from 'ask-sdk-core';
import * as sprintf from 'i18next-sprintf-postprocessor';
import i18n from 'i18next';
import en from './../assets/translations/en.json';
import es from './../assets/translations/es.json';
import de from './../assets/translations/de.json';

/**
 * Adds translation functions to the RequestAttributes.
 */
export const LocalizationRequestInterceptor: RequestInterceptor = {
  process(handlerInput: HandlerInput) {
    const resources = {
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
    };

    const localizationClient: any = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler:
        sprintf.overloadTranslationOptionHandler,
      fallbackLng: 'en', // fallback to EN if locale doesn't exist
      resources,
      returnObjects: true,
    });
  },
};
