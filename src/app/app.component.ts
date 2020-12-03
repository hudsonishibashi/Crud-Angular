import { NotificationService } from './notification.service';
import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { ILoginClient } from './client/models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-frontend';

  viewMenu: boolean = false;
  currentUser!: ILoginClient;
  userDisplayName: any;
  currentViewMenu: any;

  constructor(
    private authService: AuthService,
    private notification: NotificationService
    ) {}

  ngOnInit() {
    this.checkLoginUser();
  }

  checkLoginUser() {
    this.authService.menuEmitter.subscribe(
      (mostrar: boolean) => {
        this.userDisplayName = localStorage.getItem('loggedUser');
        this.verifyUser();
        return this.viewMenu = mostrar;
      }
    );
    if (localStorage.getItem('currentUser')) {
      this.viewMenu = true;
      this.userDisplayName = localStorage.getItem('loggedUser');
      this.verifyUser();
    } else {
      this.viewMenu = false;
    }
  }

  openDialog() {
    this.notification.openDialog(
      0,
      'Deseja realmente sair?', 
      '', 
      this, 
      () => {this.logout()}
      );
  }

  logout() {
    this.authService.logout();
    this.viewMenu = false;
  }

  verifyUser() {
    const currentViewMenu = this.authService.currentUserValue;
    if (currentViewMenu?.admin) {
      this.currentViewMenu = true;
    } else {
      this.currentViewMenu = false;
    }
  }
}
