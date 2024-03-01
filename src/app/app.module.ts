import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule, GoogleSigninButtonModule, GoogleInitOptions } from '@abacritt/angularx-social-login';
import { HttpClient, HttpClientModule } from '@angular/common/http';


const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false, // default is true
  scopes: 'https://www.googleapis.com/auth/gmail.readonly'
}; // https://developers.google.com/identity/oauth2/web/guides/use-token-model#initialize_a_token_client

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, SocialLoginModule, GoogleSigninButtonModule, HttpClientModule
  ],
  providers: [
    HttpClient,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            // provider: new GoogleLoginProvider('732667058697-p4s4cb64l0rdjdbtd0enmd01a1lvimmn.apps.googleusercontent.com', googleLoginOptions),
            provider: new GoogleLoginProvider('732667058697-rrf26te5k1ce13tha5cl0p2ogbl5tl4k.apps.googleusercontent.com', googleLoginOptions),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
