import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators'
import { AuthService, SecurityToken } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/connect/token')) {
      return next.handle(req.clone({ withCredentials: true }));
    }

    let expires = this.authService.getExpiration();
    if (expires != null && expires != undefined) {
      if (Number(expires) < Date.now() / 1000) {
        //console.info("Token expires...");

        return this.getToken(req, next);
      }

      return this.addAuthorizationToken(req, next);
    }
    else {
      //console.log("Making token call...");
      return this.getToken(req, next);
    }

  }
 
  private getToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      flatMap<SecurityToken, Observable<any>>((securityToken) => {
        if (securityToken.success) {
          return this.addAuthorizationToken(req, next);
        }

        //console.error("token call failed");
        return next.handle(req);
      })
    );
  }

  private addAuthorizationToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log(`adding authorization token for URL = ${req.url}`);
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken()}`
      }
    });

    return next.handle(request);
  }
}
