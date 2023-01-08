import { Component, OnInit } from '@angular/core';
import { MainApiService } from '../main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // public focus;
  public userData: [];
  constructor(
    public restApi: MainApiService
  ) {}

  ngOnInit() {
    this.get_user();
  }

  get_user(){
    this.restApi.getUser().subscribe((data: any) => {
      this.userData = data.data;
    });
  }

}
