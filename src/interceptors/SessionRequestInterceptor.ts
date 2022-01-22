import { HandlerInput, RequestInterceptor } from 'ask-sdk-core';
import i18n from 'i18next';
import { SessionService } from './../services/SessionService';

/**
 * Add accessToken to the Session Attributes
 */
export const SessionRequestInterceptor: RequestInterceptor = {
    process(handlerInput: HandlerInput) {
        const session = new SessionService(handlerInput);
        const { accessToken } = handlerInput.requestEnvelope.session.user;
        session.attributes()[accessToken] = accessToken;
    }
}
