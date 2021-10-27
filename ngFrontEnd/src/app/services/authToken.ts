import {Injectable} from '@angular/core';
import { Token } from '../base-model/model';


@Injectable()
export class AuthToken {

    constructor() {
        //
    }

    public getToken() {
        return localStorage.getItem('access-token');
    }

    public setToken(token: Token) {
        localStorage.setItem('access-token', token.access);
        localStorage.setItem('refresh-token', token.refresh);
        localStorage.setItem('login-event', 'login' + Math.random());
    }

    public clearToken() {
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        localStorage.setItem('logout-event', 'logout' + Math.random());
    }

}
