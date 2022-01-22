import { AttributesManager, HandlerInput } from "ask-sdk-core";
import { Session, User } from "ask-sdk-model";

export class SessionService {
    
    constructor(public hi: HandlerInput){ }

    public session(): Session{
        return this.hi.requestEnvelope.session;
    }

    public attributes(){
        return this.hi.attributesManager.getSessionAttributes();
    }

    public user(): User{
        return this.session().user;
    }

    public accessToken(): string{
        return this.hi.requestEnvelope.session.user.accessToken;
    }

    public attributesManager():AttributesManager{
        return this.hi.attributesManager;
    }
}