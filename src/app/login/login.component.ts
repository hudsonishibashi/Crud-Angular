import { AuthService } from './auth.service';
import { IClient } from '../client/models/client';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])
  hide = true;
  messageCredentials!: string;

  user!: IClient;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir seu e-mail';
    }

    return this.email.hasError('email') ? 'Não é um email válido' : '';
  }

  login() {
    this.authService.login(this.email.value, this.password.value); 
    this.userCredentials();  
  }

  userCredentials() {
    if (this.email.value != '' && this.password.value != ''){
      this.authService.messageCredentialEmmilter.subscribe(
        (message: string) => {
          this.messageCredentials = message;
        }
      );
    } else if (this.email.value != '') {
      this.messageCredentials = 'Insira sua senha!';
    } else if (this.password.value != '') {
      this.messageCredentials = 'Insira seu e-mail';
    } else {
      this.messageCredentials = 'Insira seu e-mail e senha';
    }
  }

}
