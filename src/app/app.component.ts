import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end-student';    
  showHeader: boolean = false;

  constructor(private router: Router) {   

   router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    console.log('Current route:', event.url);
    this.showHeader = !['/','/auth/login', '/auth/register'].includes(event.url);
    console.log('showHeader:', this.showHeader);
  }
});

  }
  
}
