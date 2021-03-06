import {Injectable} from '@angular/core';

import {ApiService} from './api.service';
import {File, GlobalSetting} from '../models';
import {Observable} from "rxjs";


@Injectable()
export class GlobalSettingsService {
  private globalSettings: GlobalSetting[];
  private mapSettings: Map<string,string>;
  private apiName = '/global-settings';


  constructor(private apiService: ApiService) {
  }

  populateGlobalSetting() {
    this.apiService.get(`${this.apiName}`).subscribe(
      (globalSettings) => {
        this.globalSettings = globalSettings;
        this.mapSettings = new Map<string, string>();
        for(let globalSetting of this.globalSettings){
          this.mapSettings.set(globalSetting.key, globalSetting.value);
        }
      },
      (error) => console.log(error)
    );
  }

  getAllSettings(): Observable<GlobalSetting[]> {
    return this.apiService.get(`${this.apiName}`);
  }

  changeValue(key: String, value: String): Observable<GlobalSetting> {
    return this.apiService.post(`${this.apiName}/${key}`,{value: value});
  }

  importEnvironmentIsEnable(): boolean{
    return JSON.parse(this.mapSettings.get("ENVIRONMENT_IMPORT_ENABLED").toLowerCase());
  }

  importApplicationIsEnable(): boolean{
    return JSON.parse(this.mapSettings.get("APPLICATION_IMPORT_ENABLED").toLowerCase());
  }

  createApplicationIsEnable(): boolean{
    return JSON.parse(this.mapSettings.get("APPLICATION_CREATE_ENABLED").toLowerCase());
  }

  createEnvironmentIsEnable(): boolean{
    return JSON.parse(this.mapSettings.get("ENVIRONMENT_CREATE_ENABLED").toLowerCase());
  }
}
