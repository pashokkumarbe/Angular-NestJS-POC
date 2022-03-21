import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Keepalive } from '@ng-idle/keepalive';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { AccountService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  titledata = 'frontend';
  data;

  user: User;

  timeoutMax = 5;
  idleTime = 28800; // 8 hours timeout
  idleState = 'Not Started';
  timedOut = false;

  constructor(private appService: AppService,
    private accountService: AccountService,
    private idle: Idle, 
    private keepalive: Keepalive) {

      idle.setIdle(this.idleTime);
      idle.setTimeout(this.timeoutMax);
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.';  
      });

      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true; 
      });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
      const timeout: number = --countdown; 
        this.titledata = ' Auto Logout  ' + timeout; 
        if (timeout === 0) {
          this.titledata = 'Login';
          this.logout();
        } 
    });

    this.timeoutreset();

    const userdata =  localStorage.getItem('user');
    if(userdata) {
      try{
        this.user = JSON.parse(userdata);
      }catch(ex) { this.logout(); }
    }
    this.accountService.user.subscribe(x => this.user = x);
  }

  timeoutreset() {
    this.idle.watch();
    this.idleState = 'Started';
    this.timedOut = false; 
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
