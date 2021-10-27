import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';

import { LoginUser, Token, User } from "../base-model/model";
import { AuthToken } from "../services/authToken";
import { BaseService } from "../services/base_service";
import { HttpSettingsService } from "../services/httpServiceSettings";
import { SessionService } from "../services/SessionService";


@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService {
    exampleUser: User = new User(
        "jimmy", "jimmy", "jimmy12@gmail.com", "asante$4")

    public _basePath = 'api/v1/token/';
    private timer?: Subscription;
    private userSubject: BehaviorSubject<LoginUser>;
    public user: Observable<LoginUser>;
    public timerSubscription?: Subscription;


    constructor(public http: HttpClient, public router: Router,
        public _httpSettings: HttpSettingsService,
        public _sesstionService: SessionService,
        private _authToken: AuthToken
    ) {
        super(http, _httpSettings);
        this.userSubject = new BehaviorSubject<LoginUser>({});
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): LoginUser {
        return this.userSubject.value;
    }

    public login(data: Object): Observable<any> {
        return this.http.post<LoginUser>(this.getUrl()+'obtain/', data, this._httpSettings.getHeaders()).pipe(
            map(user => {
                this.userSubject.next(user);
                console.log(this.userValue)
                this.startTokenTimer()
                // this._authToken.setToken(user)
                // this._sesstionService.setUser(this.exampleUser)
                this._sesstionService.actionLoggedIn();
                return user
            })
        )
    }


    public logout() {
        // this._authToken.clearToken();
        // this._sesstionService.logout();
        this.stopTokenTimer()
        this.userSubject.next({});
        return this.router.navigate(['/login']);
    }

    public getTokenRemainingTime() {
        let accessToken:any = ''
        if (this.userValue) {
            accessToken = this.userValue.access
            if (!accessToken) {
                return 0;}
            const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
            const expires = new Date(jwtToken.exp * 1000);
            return expires.getTime() - Date.now();
        }
        return
    }

    private startTokenTimer() {
        this.timerSubscription = timer(0, 240000).subscribe(
            (res) => {
                console.log(res)
                this.refreshToken().subscribe()
            }
        );
    }

    private stopTokenTimer() {
        this.timerSubscription?.unsubscribe();
    }

    refreshToken() {
        let refreshToken: any= ''
        if (this.userValue) {
            refreshToken = this.userValue.refresh
        }
        console.log(refreshToken)
        let currentUserToken = this.userValue
        return this.http.post<Token>(this.getUrl()+ 'refresh/', {'refresh': refreshToken })
            .pipe(map((res) => {
                currentUserToken.access = res.access
                currentUserToken.refresh = res.refresh
                this.userSubject.next(currentUserToken)
                // this.startTokenTimer();
                console.log(res)
                console.log(this.userValue)
                return res;
            }));
    }

}
