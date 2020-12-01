import { ClientService } from 'src/app/client/client.service';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { ILoginClient, IResponseLoginClient } from '../client/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuth: boolean = false;
  menuEmitter = new EventEmitter<boolean>();
  client!: ILoginClient;
  loggedClient!: IResponseLoginClient;

  constructor(
    private router: Router,
    private clientService: ClientService
    ) { }

  login(email: string, password: string) {
    this.client = {email: email, password: password};
    this.clientService.verifyLoginClient(this.client).subscribe(response => {
      this.loggedClient = response;
      if (this.loggedClient != null) {
        this.userAuth = true;
        localStorage.setItem('currentUser', JSON.stringify(this.client));
        localStorage.setItem('loggedUser', this.loggedClient.name)
        this.menuEmitter.emit(true);
        this.router.navigate(['home']);
      } else {
        this.userAuth = false;
        this.menuEmitter.emit(false);
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['login']);
  }
}
