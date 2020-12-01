import { ICanDeactivate } from './../../guards/candeactivate';
import { ClientService } from './../client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdmin } from '../admin';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit, ICanDeactivate {
  clientForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;
  private modifyForm:boolean = false;
  listTypeUser: IAdmin[] = [
    {isAdmin: true, name: 'Sim'}, 
    {isAdmin: false, name: 'Não'}
  ];

  constructor(private fb: FormBuilder, 
    private clientService: ClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      admin: [false, [Validators.required]],
    });
    this.createSuccess = false;
    this.buttonDisabled = false;
  }

  save() {
    this.clientService.createClient(this.clientForm.value).subscribe(res => {
      this.buttonDisabled = this.clientForm.valid;
    });
    this.clientForm.reset();
    this.createSuccess = true;
    this.modifyForm = false;
    //window.location.reload();
  }

  onBack(): void {
    this.router.navigate(['client']);
  }

  input() {
    this.modifyForm = true;
  }

  modifyTrueRouter() {
    let verify: boolean = true;
    if (this.modifyForm) {
      if (confirm('Tem certeza que deseja sair da página? Os dados serão perdidos.')){
        verify = true
      } else {
        verify = false;
      }
    }
    return verify;
  }

  isDisabled(): boolean {
    return this.modifyTrueRouter();
  }

}
