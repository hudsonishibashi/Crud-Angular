import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { ILoginClient } from './client/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-frontend';

  viewMenu: boolean = false;
  currentUser!: ILoginClient;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.checkLoginUser();
  }

  checkLoginUser() {
    this.authService.menuEmitter.subscribe(
      (mostrar: boolean) => {
        return this.viewMenu = mostrar;
      }
    );
    if (localStorage.getItem('currentUser')) {
      this.viewMenu = true;
    } else {
      this.viewMenu = false;
    }
  }

  logout() {
    this.authService.logout();
    this.viewMenu = false;
  }
}
