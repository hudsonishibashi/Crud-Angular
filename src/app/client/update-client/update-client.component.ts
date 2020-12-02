import { ICanDeactivate } from './../../guards/candeactivate';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { IAdmin } from '../admin';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit, ICanDeactivate {
  clientForm!: FormGroup;
  createSuccess!: boolean;
  id: any;
  private modifyForm:boolean = false;
  listTypeUser: IAdmin[] = [
    {isAdmin: true, name: 'Sim'}, 
    {isAdmin: false, name: 'Não'}
  ];

  constructor(private fb: FormBuilder, 
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClientId(this.id).subscribe(res => {
      this.clientForm = this.fb.group({
        name: `${res.name}`,
        phone: `${res.phone}`,
        email: `${res.email}`,
        password: `${res.password}`,
        admin: res.admin
      })
    })
    this.createSuccess = false;
  }

  save() {
    this.clientService.updateClient(this.id, this.clientForm.value).subscribe(res => {
    })
    this.clientForm.reset();
    this.createSuccess = true;
    this.modifyForm = false;
    this.router.navigate(['client']);
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
      if (confirm('Tem certeza que deseja sair da página? As alterações serão perdidas.')){
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
