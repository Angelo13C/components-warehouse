import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {

    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd)
        this.update();
    });

  }

  update()
  {
    let currentRouteId: string = this.router.url.substring(1);
    document.getElementById(currentRouteId)?.classList.add("selected");
  }
}
