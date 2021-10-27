import { Component, OnInit } from '@angular/core';
import { User } from '../base-model/model';
import { AccountService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  private user: User = {firstName: "jim", lastName: "adu", email: "jimmy@gmail.com"}

  firstName = '';
  lastName = '';
  email = '';
  passWord = '';
  confirmPassword = ''


  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  public registerNewUser(){
    console.log(this.firstName)
    this.accountService.createUser(JSON.stringify(
			{ "email": this.email,
			  "first_name": this.firstName,
        "last_name": this.lastName,
			  "password": this.passWord })).subscribe();
  }
  
}

