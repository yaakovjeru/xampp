import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService  {
    timeoutLength = 900000;
    element: HTMLElement;

    constructor(
        public router: Router,
        private cookieService : CookieService
    ){}

    isAuthenticated (){
        // console.log(this.cookieService.get('caspi_last_updated'))

        return true;
        if(window.location.hostname == 'localhost'){
            return true;
        }
        //this.cookieService.set('caspi_last_updated', Date.now().toString(), { path: '/' });
        // setInterval(() => {
        //     let last_update:any = this.cookieService.get("caspi_last_updated");
        //     this.cookieService.set('caspi_timed_out', '', { path: '/' });
        //     if(Math.abs(Date.now()) - Math.abs(last_update) >= this.timeoutLength) {
        //         console.log('time out')
        //         this.cookieService.set('caspi_timed_out', 'true', { path: '/' });
        //         //window.location.href = 'http://jer400:10100/yam';
        //         return false;
        //     }else{
        //         return true;
        //     }
        // }, 30000);

        return true;
    }

    canActivate(): boolean {
        // console.log('check if login');
        if (!this.isAuthenticated()) {
            window.location.href = 'http://jer400:10100/caspi';
            return false;
        }
        return true;
    }

    show_loader(){
        this.element = document.getElementById('loading') as HTMLElement;
        this.element.style.display = 'flex';
    }
    hide_loader(){
        this.element = document.getElementById('loading') as HTMLElement;
        this.element.style.display = 'none';
    }
}
