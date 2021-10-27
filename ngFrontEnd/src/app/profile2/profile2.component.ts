import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit {

  constructor(private _profileService: ProfileService) { }

  ngOnInit(): void {
  }

  getProfile(){
    this._profileService.getCurrentUserProfile().subscribe(
      res => console.log(res)
    )
  }
}
