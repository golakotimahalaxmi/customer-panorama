import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { AuthService, SecurityToken } from '../services/auth/auth.service';
import { TokenDecodeService } from '../services/auth/token-decode.service';

const doAuth = environment.production;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private tokenDecodeService: TokenDecodeService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     if(!doAuth){
       return true
     } 
    let expires = this.authService.getExpiration();
    if (expires != null && expires != undefined) {
      if (Number(expires) < Date.now() / 1000) {
        console.info("Token expires...");
        this.authService.getToken().subscribe(securityToken => {
          if (securityToken.success) {
            let user = securityToken.impersonate == undefined ? securityToken.userId : securityToken.impersonate;
            console.log('RefreshToken user: ' + user);
            let claims = this.tokenDecodeService.decodeJwtToken(securityToken.accessToken);
            return true;
          }
        });
        return false;
      }
      return true;
    }
    else{
      this.authService.getToken().subscribe(securityToken => {
        if (securityToken.success) {
          let user = securityToken.impersonate == undefined ? securityToken.userId : securityToken.impersonate;
          console.log('RefreshToken user: ' + user);
          return true;
        }
      });
    }
    return false;
  }
}
