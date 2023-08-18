import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { ConfigurationLoadService } from '../configuration-load.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenDecodeService } from './token-decode.service';

export interface SecurityToken {
  userId: string
  accessToken: string
  impersonate: string
  success: boolean
  expiryMins: string
}

export class LocalStorageKeys {
  static Token = class {
    static access_token = "orderoverviewapi_access_token";
    static expiration = "token_expiration";
    static user_login = "user_login";
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  /**
   * Current impersonate. It is '', if not impersoanting.
   */
  private _impersonate: string = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient, private tokenDecodeService: TokenDecodeService) { }

  getAccessToken(): string {
    return localStorage.getItem(this.getKey(LocalStorageKeys.Token.access_token));
  }

  getExpiration(): string {
    return localStorage.getItem(this.getKey(LocalStorageKeys.Token.expiration));
  }

  getUserLogin(): string {
    if (this._impersonate !== '') {
      return this._impersonate;
    }
    return localStorage.getItem(this.getKey(LocalStorageKeys.Token.user_login));
  }

  /**
   * If impersonating, get the token for the current impersonate.
   * If not impersonating, get the token for the curren login user.
   **/
  getToken(): Observable<SecurityToken> {
    //const url = this.configurationLoadService.getSettings().security.identityUrl;
    const url = "https://stsbeta.corp.cdw.com/V3.1/DomainIdentityService/connect/token";
    const body = this.buildRequestBody();

    //console.debug('token request url = ', url);
    //console.debug('token request body = ', body);

    return this.http.post(
      url,
      body,
      this.httpOptions
    ).pipe(
      map((token: any) => {
        //console.debug('raw token = ', token);
        let securityToken = this.HandleTokenResponse(token);
        //console.debug('token returned = ', securityToken);
        return securityToken;

      }), catchError(this.handleError));
  }

  private buildRequestBody(): string {

    let data =
    {
      client_id: "DsAilabsClientId",
      grant_type: "implicit",
      scope: "http://ds.corp.cdw.com/service/customerprofile"
    };

    var body = this.toUrlEncodedString(data);
    return body;
  }

  setImpersonate(impersonate: string) {
    const userLogin = localStorage.getItem(this.getKey(LocalStorageKeys.Token.user_login));
    this._impersonate = (impersonate === null || impersonate === undefined || impersonate === userLogin) ? '' : impersonate;
  }

  private getKey(storageKey: string): string {
    if (storageKey === LocalStorageKeys.Token.user_login) {
      return storageKey;
    }
    return storageKey + this._impersonate;
  }

  private HandleTokenResponse(token: any): SecurityToken {

    let decodedToken = this.tokenDecodeService.decodeJwtToken(token.access_token);

    const accessTokenKey = this.getKey(LocalStorageKeys.Token.access_token);
    localStorage.setItem(accessTokenKey, token.access_token);

    const expirationKey = this.getKey(LocalStorageKeys.Token.expiration);
    localStorage.setItem(expirationKey, decodedToken.exp);

    let userId = this.tokenDecodeService.getUserIdFromToken(decodedToken);
    let impersonateUserId = this.tokenDecodeService.getImpersonateUserIdFromToken(decodedToken);

    const userLoginKey = this.getKey(LocalStorageKeys.Token.user_login);
    localStorage.setItem(userLoginKey, userId);
    
    this.logInfo(token, decodedToken);

    let securityToken: SecurityToken = {
      'userId': userId,
      'accessToken': token.access_token,
      'impersonate': impersonateUserId,
      'success': true,
      'expiryMins': token.expiration,
    }

    return securityToken;
  }

  private logInfo(token: any, decodedToken: any) {

    var expirationDate = new Date(decodedToken.exp * 1000);

    console.log("token expiry in mins: " + token.expiration);
    console.log("Token expiration date time:" + expirationDate);
    console.log("token: ", token);

    console.log("token.access_token = ", token.access_token);
    console.log("decoded_token: ", decodedToken);
  }

  private toUrlEncodedString(data: any) {
    var body = "";
    for (var key in data) {
      if (body.length) {
        body += "&";
      }
      body += key + "=";
      body += encodeURIComponent(data[key]);
    }
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    console.log(error);
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    let securityToken: SecurityToken = {
      'userId': null,
      'accessToken': null,
      'impersonate': null,
      'success': false,
      'expiryMins': null
    }

    return of(securityToken);
  }

}



