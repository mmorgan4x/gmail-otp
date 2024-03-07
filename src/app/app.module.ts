import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from '@shared/shared.module';
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
