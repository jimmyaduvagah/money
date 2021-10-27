import {Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {BaseModel} from '../base-model/model';
import { HttpSettingsService } from './httpServiceSettings';


export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;


@Injectable()
export class BaseService {
    public _basePath = '';
    constructor(
        public http: HttpClient,
        public _httpSettings: HttpSettingsService) {
    }

    public getUrl(params?: string) {
        if (typeof params === 'undefined') {
            return this._httpSettings.getBaseUrl() + this._basePath;
        } else {
            return this._httpSettings.getBaseUrl() + params;
        }
    }

    public getOptions () {
      return this._httpSettings.getHeaders();
  }
}
