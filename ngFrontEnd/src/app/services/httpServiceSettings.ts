import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { SessionService } from "./SessionService";
import { SettingsService } from "./SettingsService";


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};


@Injectable()
export class HttpSettingsService {

    private protocol;
    private domain;
    private baseUrl;
    
    constructor( private _sessionService: SessionService, private _settings: SettingsService )
    {
        this.protocol = _settings.getProtocol();
        this.domain = _settings.getDomain();
        this.baseUrl = _settings.getBaseUrl();
    }

    public getHeaders() {
        return httpOptions
    }

    public getBaseUrl() {
        return this.protocol + '://' + this.domain + this.baseUrl;
    }
}
