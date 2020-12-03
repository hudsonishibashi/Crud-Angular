import { AuthService } from './../login/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]); 
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  messageCredentials!: string;
  public mask = ['+', '5', '5', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Você deve inserir seu e-mail';
    }

    return this.email.hasError('email') ? 'Não é um email válido' : '';
  }

  register() {
    this.authService.register(this.name.value, this.email.value, this.phone.value, this.password.value);
  }

}
