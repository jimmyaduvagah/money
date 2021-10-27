import {Injectable} from '@angular/core';

@Injectable()
export class SettingsService {

    private devMode = true;
    private protocol = 'http';
    private domain = '127.0.0.1';
    private baseUrl = ':8000/';
    private apiVersion = '1';


    constructor() {
        // if (!this.devMode) {
        //     this.protocol = 'http';
        //     this.domain = '127.0.0.1';
        // }
    }


    public getProtocol() {
        return this.protocol;
    }

    public isDevMode() {
        return this.devMode;
    }

    public getDomain() {
        return this.domain;
    }

    public getBaseUrl() {
        return this.baseUrl;
    }
}

