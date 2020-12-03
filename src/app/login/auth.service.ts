import { ClientService } from 'src/app/client/client.service';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { ILoginClient, IResponseLoginClient } from '../client/models/client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuth: boolean = false;
  menuEmitter = new EventEmitter<boolean>();
  messageCredentialEmmilter = new EventEmitter<string>();
  client!: ILoginClient;
  loggedClient!: IResponseLoginClient;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private router: Router,
    private clientService: ClientService
    ) { 
      this.currentUserSubject = new BehaviorSubject<IResponseLoginClient>(JSON.parse(localStorage.getItem('loggedUserComplete') || '{}'));
    }
  
  public get currentUserValue(): IResponseLoginClient | null {
    if (localStorage.getItem('loggedUserComplete')) {
      return this.currentUserSubject.value;
    }
    return null;
  }  

  login(email: string, password: string) {
    this.client = {email: email, password: password};
    this.clientService.verifyLoginClient(this.client).subscribe(response => {
      this.loggedClient = response;
      if (this.loggedClient != null) {
        localStorage.setItem('currentUser', JSON.stringify(this.client));
        localStorage.setItem('loggedUserComplete',JSON.stringify( this.loggedClient))
        localStorage.setItem('loggedUser', this.loggedClient.name)
        this.currentUserSubject.next(this.loggedClient);
        this.menuEmitter.emit(true);
        this.router.navigate(['home']);
      } else {
        this.menuEmitter.emit(false);
        this.messageCredentialEmmilter.emit('Dados inválidos. Tente novamente!');
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUserComplete');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }
}
