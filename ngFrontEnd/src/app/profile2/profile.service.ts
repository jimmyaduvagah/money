import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';

import { Token, User } from "../base-model/model";
import { AuthToken } from "../services/authToken";
import { BaseService } from "../services/base_service";
import { HttpSettingsService } from "../services/httpServiceSettings";
import { SessionService } from "../services/SessionService";


@Injectable({
    providedIn: 'root',
})
export class ProfileService extends BaseService {

    public _basePath = 'api/v1/users/';

    constructor(public http: HttpClient,
        public _httpSettings: HttpSettingsService,
        public _sesstionService: SessionService,
        private _authToken: AuthToken
    ) {
        super(http, _httpSettings);
    }
    
    public getCurrentUserProfile(): Observable<any>{
        return this.http.get(this.getUrl(), this._httpSettings.getHeaders())
    }

    public setUser(): Observable<any> {
        return this.http.get(this._httpSettings.getBaseUrl() + 'api/v1/users/', this._httpSettings.getHeaders()).pipe(
            map(res => {
                console.log(res)
            })
        )
    }
}


