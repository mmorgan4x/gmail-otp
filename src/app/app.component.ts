import { ChangeDetectorRef, Component, } from '@angular/core';
import { ApiService } from './api.service';
import { gmail_v1, oauth2_v2 } from 'googleapis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loading: boolean = false;
  codes: string[]
  email: string
  userInfo?: oauth2_v2.Schema$Userinfo;
  messages?: gmail_v1.Schema$Message[] = []

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.email = (await chrome.identity.getProfileUserInfo()).email;

    chrome.identity.getAuthToken({ interactive: true }, async (token) => {
      let user = await this.api.getUserInfo(token as string);
      console.log(user)
    })
  }

  async click() {
    this.loading = true;
    chrome.identity.getAuthToken({ interactive: true }, async (token) => {

      let emailsIds = await this.api.getEmails(token as string).then(t => t.messages.map(s => s.id));

      this.messages = await Promise.all(emailsIds.map(t => this.api.getEmailById(t, token as string)));
      console.log(emailsIds, this.messages)
      this.loading = false;
      this.cdr.detectChanges();

      //       const otpMatch = email.snippet.match(/\b\d{6}\b/);
      //       if (otpMatch) {
      //         otpCodes.push(otpMatch[0]);
      //       }
      //     });

    });
  }
}