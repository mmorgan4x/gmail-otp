import { oauth2_v2, gmail_v1 } from 'googleapis';

export declare namespace Oauth2 {
    export import UserInfo = oauth2_v2.Schema$Userinfo;
}

export declare namespace Gmail {
    export import Message = gmail_v1.Schema$Message;
    export import ListMessagesResponse = gmail_v1.Schema$ListMessagesResponse;
}

