import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, } from 'rxjs';
import { Gmail, Oauth2 } from '@shared/models/types';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    private oauthApiUrl = 'https://www.googleapis.com/oauth2/v1';
    private gmailApiUrl = 'https://www.googleapis.com/gmail/v1';

    constructor(private http: HttpClient,) { }

    getUserInfo() {
        return firstValueFrom(this.http.get<Oauth2.UserInfo>(`${this.oauthApiUrl}/userinfo`));
    }

    getEmails() {
        // https://support.google.com/mail/answer/7190
        let params = { maxResults: 10, q: 'newer_than:2h' };
        return firstValueFrom(this.http.get<Gmail.ListMessagesResponse>(`${this.gmailApiUrl}/users/me/messages`, { params }));
    }

    getEmailById(id: string) {
        return firstValueFrom(this.http.get<Gmail.Message>(`${this.gmailApiUrl}/users/me/messages/${id}`));
    }
}
