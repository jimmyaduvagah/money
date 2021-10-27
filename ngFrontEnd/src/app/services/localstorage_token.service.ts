import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


interface LoginResult {
    username: string;
    role: string;
    originalUserName: string;
    accessToken: string;
    refreshToken: string;
}


@Injectable()
export class AuthToken implements OnDestroy {
    private readonly apiUrl = `${environment.apiUrl}api/account`;
    private timer?: Subscription;
    private _user = new BehaviorSubject<any>(null);
    user$: Observable<any> = this._user.asObservable();

    constructor(private http: HttpClient) {
        window.addEventListener('storage', this.storageEventListener.bind(this))
    }

    ngOnDestroy(): void {
        window.removeEventListener('storage', this.storageEventListener.bind(this));
      }
    

    public getToken() {
        return localStorage.getItem('auth-token');
    }

    public setToken(token: string) {
        return localStorage.setItem('auth-token', token);
    }

    public clearToken() {
        return localStorage.removeItem('auth-token');
    }
    private storageEventListener(event: StorageEvent) {
        if (event.storageArea === localStorage) {
            if (event.key === 'logout-event') {
                this.stopTokenTimer();
                this._user.next(null);
            }
            if (event.key === 'login-event') {
                this.stopTokenTimer();
                this.http.get<LoginResult>(`${this.apiUrl}/user`).subscribe((x) => {
                    this._user.next({
                        username: x.username,
                        role: x.role,
                        originalUserName: x.originalUserName,
                    });
                }
    
            });
        }
    }

    private refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            this.clearLocalStorage();
            return of(null);
        }

        return this.http
            .post<LoginResult>(`${this.apiUrl}/refresh-token`, { refreshToken })
            .pipe(
                map((x) => {
                    this._user.next({
                        username: x.username,
                        role: x.role,
                        originalUserName: x.originalUserName,
                    });
                    this.setLocalStorage(x);
                    this.startTokenTimer();
                    return x;
                })
            );
    }

    setLocalStorage(x: LoginResult) {
        localStorage.setItem('access_token', x.accessToken);
        localStorage.setItem('refresh_token', x.refreshToken);
        localStorage.setItem('login-event', 'login' + Math.random());
    }

    clearLocalStorage() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.setItem('logout-event', 'logout' + Math.random());
    }

    private getTokenRemainingTime() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return 0;
        }
        const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        return expires.getTime() - Date.now();
    }

    private startTokenTimer() {
        const timeout = this.getTokenRemainingTime();
        this.timer = of(true)
            .pipe(
                delay(timeout),
                tap(() => this.refreshToken().subscribe())
            )
            .subscribe();
    }

    private stopTokenTimer() {
        this.timer?.unsubscribe();
    }
}
