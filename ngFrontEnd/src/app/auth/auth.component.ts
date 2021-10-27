import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/SessionService';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	public email: any;
	public password: any;
	public isAuthenticated: boolean = false;

	constructor(private authService: AuthService,
		private _sessionService: SessionService, public router: Router
	) {
		// if (typeof this._sessionService.user !== 'undefined') {
		// 	this.isAuthenticated = this._sessionService.isLoggedIn();
		// } else {
		// 	this._sessionService.userObservable.subscribe((res) => {
		// 		this.isAuthenticated = this._sessionService.isLoggedIn();
		// 	});
		// }
	}
	ngOnInit(): void {
	}

	signIn() {
		console.log(this.password)
		this.authService.login(JSON.stringify(
			{ "email": this.email,
			  "username": "jimmy8.aduvagah@gmail.com",
			  "password": this.password })).subscribe();
	}

	signOut() {
		this.authService.logout();
	}
}