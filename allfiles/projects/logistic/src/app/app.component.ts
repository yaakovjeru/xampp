import { Component, HostListener } from '@angular/core';
import { AuthGuardService } from 'core';

@Component({
    selector: 'app-root',
    template: `
        <lib-navbar></lib-navbar>
        <div class="main-content">
            <router-outlet></router-outlet>
        </div>
    `,
})
export class AppComponent {
    title = 'dashboard';
    
    constructor(
        public authService: AuthGuardService
    ){}

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
        this.authService.canActivate();
    }
}
