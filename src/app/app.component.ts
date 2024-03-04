import { ChangeDetectorRef, Component, } from '@angular/core';
import { ApiService } from './api.service';
import { Gmail, Oauth2 } from './types';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loading: boolean = false;
  codes: any[]
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
    console.log(this.messages)

    this.codes = this.messages.map(msg => {
      return {
        msg: msg,
        date: moment(+msg.internalDate).fromNow(),
        unread: msg.labelIds.includes('UNREAD'),
        from: this.parseEmail(this.getHeader(msg, 'From')),
        subject: this.getHeader(msg, 'Subject'),
        snippet: this.replaceHtmlEntities(msg.snippet.trim()),
        code: msg.snippet.match(/\b\d{6}\b/)?.at(0)
      }
    })
  }

  getHeader(msg: Gmail.Message, name: string) {
    return msg?.payload?.headers?.find(t => t.name == name)?.value;
  }

  parseEmail(email: string) {
    const match = email.match(/"?(.*?)"?\s<([^>]+)>/);
    return { display: match?.at(1), value: match?.at(2) };
  }

  replaceHtmlEntities(text: string) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText;
  }

}