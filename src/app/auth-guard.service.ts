import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor( 
        public router: Router,
        private cookieService : CookieService
    ) {}
    
  isAuthenticated (){
    // if (this.cookieService.get("session_key")) { 
    //     return true;
    // }
    //cookieService.set('session-key','some-value');
    return true;
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}