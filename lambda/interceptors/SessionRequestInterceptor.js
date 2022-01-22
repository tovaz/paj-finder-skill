"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRequestInterceptor = void 0;
const SessionService_1 = require("./../services/SessionService");
/**
 * Add accessToken to the Session Attributes
 */
exports.SessionRequestInterceptor = {
    process(handlerInput) {
        const session = new SessionService_1.SessionService(handlerInput);
        const { accessToken } = handlerInput.requestEnvelope.session.user;
        session.attributes()[accessToken] = accessToken;
    }
};
//# sourceMappingURL=SessionRequestInterceptor.js.map