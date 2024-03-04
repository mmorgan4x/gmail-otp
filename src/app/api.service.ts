import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, } from 'rxjs';
import { gmail_v1, oauth2_v2 } from 'googleapis';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'https://www.googleapis.com/gmail/v1'

    constructor(private http: HttpClient,) { }

    getUserInfo(token: string) {
        let headers = { Authorization: `Bearer ${token}` };
        return firstValueFrom(this.http.get<oauth2_v2.Schema$Userinfo>(`https://www.googleapis.com/oauth2/v1/userinfo`, { headers }));
    }
    getEmails(token: string) {
        let params = { maxResults: 10 };
        let headers = { Authorization: `Bearer ${token}` };
        return firstValueFrom(this.http.get<gmail_v1.Schema$ListMessagesResponse>(`${this.apiUrl}/users/me/messages`, { params, headers }));
    }
    getEmailById(id: string, token: string) {
        let params = { maxResults: 10 };
        let headers = { Authorization: `Bearer ${token}` };
        return firstValueFrom(this.http.get<gmail_v1.Schema$Message>(`${this.apiUrl}/users/me/messages/${id}`, { params, headers }));
    }
}
