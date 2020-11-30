import { ClientService } from 'src/app/client/client.service';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { ILoginClient } from '../client/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuth: boolean = false;
  menuEmitter = new EventEmitter<boolean>();
  client!: ILoginClient;
  exists: boolean = false;

  constructor(
    private router: Router,
    private clientService: ClientService
    ) { }

  login(email: string, password: string) {
    this.client = {email: email, password: password};
    this.clientService.verifyLoginClient(this.client).subscribe(response => {
      this.exists = response;
      if (this.exists == true) {
        this.userAuth = true;
        localStorage.setItem('currentUser', JSON.stringify(this.client));
        this.menuEmitter.emit(true);
        this.router.navigate(['home']);
      } else {
        this.userAuth = false;
        this.menuEmitter.emit(false);
      }
    });
  }

  userIsAuth() {
    return this.userAuth;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
