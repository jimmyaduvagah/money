import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { LoginUser, User } from "../base-model/model";
import { AuthToken } from "../services/authToken";
import { BaseService } from "../services/base_service";
import { HttpSettingsService } from "../services/httpServiceSettings";
import { SessionService } from "../services/SessionService";


export interface Token {
    token: string;
    user: any;
  }


@Injectable({
    providedIn: 'root',
 })
export class AccountService extends BaseService {
    public _basePath = 'api/v1/accounts/register/';
    private userLogin?: LoginUser
    public user?: User;
    constructor(public http: HttpClient,
                public _httpSettings: HttpSettingsService,
                public _sesstionService: SessionService,
                private _authToken: AuthToken,
    ) {
        super(http, _httpSettings);
    }


    public createUser(data: Object): Observable<any>{
        return this.http.post<User>(this.getUrl(), data, this._httpSettings.getHeaders()).pipe(
            map(res => {
                this.user = res;
                return res
            })
        )
    }
}