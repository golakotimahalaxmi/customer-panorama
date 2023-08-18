import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenDecodeService {

  constructor() { }

  public decodeJwtToken(token: string) {
    var parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    var decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  private urlBase64Decode(str: string) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return decodeURIComponent(encodeURI(window.atob(output)));
  }

  getUserIdFromToken(parsedToken: any): string {
    let userId = this.getUserFromNetworkName(parsedToken.nameid);
    return userId;
  }

  getImpersonateUserIdFromToken(parsedToken: any): string {
    if (parsedToken.impersonate == undefined || parsedToken.impersonate == "undefined" || parsedToken.impersonate == null)
      return undefined;
    let userId = this.getUserFromNetworkName(parsedToken.impersonate);
    return userId;
  }

  private getUserFromNetworkName(networkName: string): string {
    if (!networkName.includes('\\')) {
      return networkName;
    }
    let items = networkName.split('\\');
    if (items.length == 2) {
      return items[1];
    }
    return networkName;
  }
 
}
