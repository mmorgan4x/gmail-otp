import { ChangeDetectorRef, Component, } from '@angular/core';
import { ApiService } from './api.service';
import { Gmail, Oauth2 } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loading: boolean = false;
  codes: string[]
  email: string
  userInfo?: Oauth2.UserInfo;
  messages?: Gmail.Message[] = []

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.email = (await chrome.identity.getProfileUserInfo()).email;
    this.userInfo = await this.api.getUserInfo();
    this.cdr.detectChanges();
  }

  async click() {
    this.loading = true;

    let emailsIds = await this.api.getEmails().then(t => t.messages.map(s => s.id));

    this.messages = await Promise.all(emailsIds.map(t => this.api.getEmailById(t)));
    this.loading = false;
    this.cdr.detectChanges();

    //       const otpMatch = email.snippet.match(/\b\d{6}\b/);
    //       if (otpMatch) {
    //         otpCodes.push(otpMatch[0]);
    //       }
    //     });

  }
}