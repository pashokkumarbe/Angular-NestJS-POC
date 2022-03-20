import { Component } from '@angular/core';
import { AppService } from './app.service';

import { AccountService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  data;

  user: User;

  constructor(private appService: AppService,
    private accountService: AccountService) {
    const userdata =  localStorage.getItem('user');
    if(userdata) {
      try{
        this.user = JSON.parse(userdata);
      }catch(ex) { this.logout(); }
    }
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }


  init() {
    this.appService.getData().subscribe({ next: data => this.data = data });
  }

  signup() {
    const userdata: any = {
      email: 'test@gmai.com',
      pwd: 'test@123'
    };
    this.appService.postUserData(userdata).subscribe((data: any) => {
      this.data = data;
    }, (err: any) => {
      this.data = err;
    });
  }

  signin() {
    const userdata: any = {
      email: 'test@gmai.com',
      pwd: 'test@123'
    };
    this.appService.login(userdata).subscribe((data: any) => {
      this.data = data;
    }, (err: any) => {
      this.data = err;
    });
  }
  
}
