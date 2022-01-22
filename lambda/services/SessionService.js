"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
class SessionService {
    constructor(hi) {
        this.hi = hi;
    }
    session() {
        return this.hi.requestEnvelope.session;
    }
    attributes() {
        return this.hi.attributesManager.getSessionAttributes();
    }
    user() {
        return this.session().user;
    }
    accessToken() {
        return this.hi.requestEnvelope.session.user.accessToken;
    }
    attributesManager() {
        return this.hi.attributesManager;
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=SessionService.js.map