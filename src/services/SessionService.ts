import { AttributesManager, HandlerInput } from "ask-sdk-core";
import { Session, User } from "ask-sdk-model";

export class SessionService {
    
    constructor(public hi: HandlerInput){ }

    session(): Session{
        return this.hi.requestEnvelope.session;
    }

    attributes(){
        return this.hi.attributesManager.getSessionAttributes();
    }

    user(): User{
        return this.session().user;
    }

    accessToken(): string{
        return this.hi.requestEnvelope.session.user.accessToken;
    }

    attributesManager():AttributesManager{
        return this.hi.attributesManager;
    }
}