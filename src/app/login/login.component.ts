import { AuthService } from './auth.service';
import { IClient } from './../client/client';
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

  user!: IClient;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir um valor';
    }

    return this.email.hasError('email') ? 'Não é um email válido' : '';
  }

  login() {
    this.authService.login(this.email.value, this.password.value);   
  }

}
