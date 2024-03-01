import { Component, } from '@angular/core';
import { ApiService } from './api.service';
import { gmail_v1, oauth2_v2 } from 'googleapis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  codes: string[]
  email: string
  userInfo?: oauth2_v2.Schema$Userinfo;
  messages?: gmail_v1.Schema$Message[];

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.email = (await chrome.identity.getProfileUserInfo()).email;

    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      let user = await this.api.getUserInfo(token as string);
      console.log(user)
    })
  }

  async click() {
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {

      let emails = await this.api.getEmails(token as string);
      this.messages = emails.messages;
      console.log(emails.messages)

      // let req = this.http.get(requestUrl, {
      //   headers: { Authorization: `Bearer ${token}` },
      // }).pipe(
      //   tap(t => console.log('resp', t)),
      //   mergeMap((response: any) => {
      //     const messages = response.messages;
      //     const messageIds = messages.map((message: any) => message.id);
      //     const messageRequests = messageIds.map((id: string) =>
      //       this.http.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${id}`, {
      //         headers: { Authorization: `Bearer ${token}` },
      //       })
      //     );

      //     return forkJoin(messageRequests);
      //   }),
      //   map((emails: any) => {
      //     console.log('emails', emails)
      //     const otpCodes: string[] = [];

      //     emails.forEach((email: any) => {

      //       const otpMatch = email.snippet.match(/\b\d{6}\b/);

      //       if (otpMatch) {
      //         otpCodes.push(otpMatch[0]);
      //       }
      //     });

      //     return otpCodes;
      //   }),
      // );

      // req.subscribe(t => console.log(t))
    })

  }
}