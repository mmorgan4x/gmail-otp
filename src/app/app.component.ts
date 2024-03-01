import { Component, } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser, } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, forkJoin, from, map, mergeMap, of, repeat, retry, retryWhen, switchMap, tap, timer } from 'rxjs';
// provider: string;
// id: string;
// email: string;
// name: string;
// photoUrl: string;
// firstName: string;
// lastName: string;
// authToken: string;
// idToken: string;
// authorizationCode: string;
// response: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  user!: SocialUser;
  isLoggedin?: boolean;
  codes: string[]

  get accessToken() { return localStorage.getItem('accessToken') || '' };
  set accessToken(val) { localStorage.setItem('accessToken', val) };


  constructor(private authService: SocialAuthService, private http: HttpClient) { }

  ngOnInit() {
    // this.authService.authState.subscribe((user: SocialUser) => {
    //   console.log(user)
    //   this.user = user;
    //   this.isLoggedin = (user != null);
    //   this.getAccessToken();
    // });
    this.fetchOTPCode().subscribe(t => this.codes = t)
  }

  // getAccessToken(): void {
  //   this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => {
  //     this.accessToken = accessToken + 'dd'
  //     this.fetchOTPCode().subscribe(t => this.codes = t);
  //   });
  // }

  getAccessToken() {
    return from(this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID)).pipe(tap(t => console.log('token', t)), tap(t => this.accessToken = t))
  }

  logOut(): void {
    this.authService.signOut();
  }

  fetchOTPCode(): Observable<string[]> {
    const requestUrl = 'https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10';

    return this.http.get(requestUrl, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    }).pipe(
      tap(t => console.log('resp', t)),
      mergeMap((response: any) => {
        const messages = response.messages;
        const messageIds = messages.map((message: any) => message.id);
        const messageRequests = messageIds.map((id: string) =>
          this.http.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${id}`, {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          })
        );

        return forkJoin(messageRequests);
      }),
      map((emails: any) => {
        console.log('emails', emails)
        const otpCodes: string[] = [];

        emails.forEach((email: any) => {

          const otpMatch = email.snippet.match(/\b\d{6}\b/);

          if (otpMatch) {
            otpCodes.push(otpMatch[0]);
          }
        });

        return otpCodes;
      }),
    );
  }
}