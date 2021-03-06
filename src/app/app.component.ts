import { NotificationService } from './notification.service';
import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { ILoginClient } from './client/models/client';
import { ICart } from './common-user/cart';

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
  hidden: boolean = false;
  listCart: Array<ICart> = [];

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
        this.getListProductsCart();
        return this.viewMenu = mostrar;
      }
    );
    if (localStorage.getItem('currentUser')) {
      this.viewMenu = true;
      this.userDisplayName = localStorage.getItem('loggedUser');
      this.verifyUser();
      this.getListProductsCart();
    } else {
      this.viewMenu = false;
    }
  }

  openDialog() {
    this.notification.openDialog(
      0,
      'Deseja realmente sair?', 
      '',
      true, 
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

  getListProductsCart() {
    const currentUser = this.authService.currentUserValue;
    this.listCart = JSON.parse(localStorage.getItem(`addCart${currentUser?.id}`) || '{}');
  }
}
