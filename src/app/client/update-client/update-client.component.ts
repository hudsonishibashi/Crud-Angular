import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
  clientForm!: FormGroup;
  createSuccess!: boolean;
  id: any;

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
      })
    })
    this.createSuccess = false;
  }

  save() {
    this.clientService.updateClient(this.id, this.clientForm.value).subscribe(res => {
    })
    this.clientForm.reset();
    this.createSuccess = true;
  }

  onBack(): void {
    this.router.navigate(['client']);
  }
}
