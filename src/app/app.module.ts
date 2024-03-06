import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
