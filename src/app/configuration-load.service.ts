// #region -- imports --
/*import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Settings } from '../models/settings.model';
import { environment } from './environments/environment';
// #endregion

@Injectable({
  providedIn: 'root'
})
export class ConfigurationLoadService {
  // #region -- variables --
  private settings: Settings;
  // #endregion

  // #region -- ctor --
  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  // #endregion

  // #region -- properties --
  get configSettings() {
    return this.settings;
  }
  // #endregion

  // #region -- public methods --
  public getSettings() {
    return this.settings;
  }

  loadConfiguration(): Promise<any> {
    var url = '/api/configuration/getsettings';
    if (environment.production)
      url = '/OrderOverview' + url;

    const promise = this.httpClient.get(url)
      .toPromise()
      .then(settings => {
        this.settings = Settings.map(settings);
        return settings;
      });//.catch((reason: any) => { console.error(reason) });

    return promise;
  }
  // #endregion
}*/
