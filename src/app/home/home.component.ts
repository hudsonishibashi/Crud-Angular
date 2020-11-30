import { Component, OnInit } from '@angular/core';
import { ILoginClient } from '../client/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser!: ILoginClient;

  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
  }

}
