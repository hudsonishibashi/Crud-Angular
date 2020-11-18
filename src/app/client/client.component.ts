import { ClientService } from './client.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ResponseIClient, IClient } from './client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone'];
  responseIClients!: ResponseIClient;
  erroMessage: string = '';
  dataSource: any;
  next: boolean = false;
  previous: boolean = false;
  
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe({
      next: clients => {
        this.dataSource = new MatTableDataSource(clients.content);
        this.responseIClients = clients
        this.previous = true;
      },
      error: err => this.erroMessage = err
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
