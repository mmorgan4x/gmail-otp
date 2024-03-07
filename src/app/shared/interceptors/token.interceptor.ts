import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { bindCallback } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    getAuthToken = bindCallback(chrome.identity.getAuthToken);

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.getAuthToken(({ interactive: true })).pipe(
            switchMap(token => {
                return next.handle(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
            })
        );
    }
}
