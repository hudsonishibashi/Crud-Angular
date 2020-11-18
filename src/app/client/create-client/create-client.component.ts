import { ClientService } from './../client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  clientForm!: FormGroup;
  createSuccess!: boolean;
  buttonDisabled!: any;

  constructor(private fb: FormBuilder, 
    private clientService: ClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
    //window.location.reload();
  }

  onBack(): void {
    this.router.navigate(['client']);
  }

}
