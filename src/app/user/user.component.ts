import { Router } from '@angular/router';
import { AuthService } from './../login/auth.service';
import { ClientService } from './../client/client.service';
import { Component, OnInit } from '@angular/core';
import { IClient } from '../client/models/client';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user!: IClient;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    const currentUser = this.authService.currentUserValue;
    this.clientService.getClientId(currentUser?.id).subscribe(res => {
      this.user = res;
    })
  }

  returnPage() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser?.admin == true) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/common']);
    }
  }

}
