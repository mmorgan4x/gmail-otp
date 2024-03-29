import { Component, } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ApiService } from '@services/api.service';
import { Gmail, Oauth2 } from '@shared/models/types';

@Component({
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class PopupComponent {

  loading = true;
  email: string
  userInfo?: Oauth2.UserInfo;
  codes: any[] = [];
  version: string = chrome.runtime.getManifest()['version'];
  homepageUrl: string = chrome.runtime.getManifest()['homepage_url'];

  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.load();
    this.email = (await chrome.identity.getProfileUserInfo()).email;
    this.userInfo = await this.api.getUserInfo();
  }

  async load() {
    this.loading = true;

    let emailsIds = (await this.api.getEmails())?.messages?.map(s => s.id) || [];
    let messages = await Promise.all(emailsIds.map(t => this.api.getEmailById(t)));
    console.log(messages)

    this.loading = false;

    this.codes = messages.map(msg => {
      return {
        msg: msg,
        date: new Date(+msg.internalDate),
        unread: msg.labelIds.includes('UNREAD'),
        flagged: msg.labelIds.includes('STARRED'),
        hasAttachment: msg?.payload?.parts?.some(t => !!t?.filename),
        from: this.parseEmail(this.getHeader(msg, 'From')),
        subject: this.getHeader(msg, 'Subject'),
        snippet: this.replaceHtmlEntities(msg.snippet.trim()),
        code: `${this.getHeader(msg, 'Subject')} ${msg.snippet}`.match(/\b\d{6}\b/)?.at(0)
      }
    })
  }

  loadMore() {
    // TODO
    this.load();
  }

  getHeader(msg: Gmail.Message, name: string) {
    return msg?.payload?.headers?.find(t => t.name == name)?.value;
  }

  parseEmail(email: string) {
    const match = email.match(/"?(.*?)"?\s<([^>]+)>/);
    return { display: match?.at(1), value: match?.at(2), og: email };
  }

  replaceHtmlEntities(text: string) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText;
  }

  copy(inputEl: HTMLInputElement) {
    inputEl.select();
    navigator.clipboard.writeText(window.getSelection().toString());
    // document.execCommand('copy');
  }

  async options() {
    await new Promise<void>(r => chrome.runtime.openOptionsPage(r));
  }

}