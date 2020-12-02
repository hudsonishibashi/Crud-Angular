import { NotificationService } from './../notification.service';
import { ClientService } from './client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ResponseIClient } from './client';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'admin', 'action'];
  responseIClients!: ResponseIClient;
  erroMessage: string = '';
  dataSource: any;
  next: boolean = false;
  previous: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private clientService: ClientService, private notifcation: NotificationService) { }

  ngOnInit(): void {
    this.clientService.getClient().subscribe({
      next: clients => {
        this.dataSource = new MatTableDataSource(clients.content);
        this.responseIClients = clients
        this.previous = true;
        this.dataSource.paginator = this.paginator;
      },
      error: err => this.erroMessage = err
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id:any) {
    this.notifcation.openDialog(
      id, 
      'Deseja realmente excluir esse cliente?', 
      'Está ação não poderá ser revertida.', 
      this, 
      () => {this.deleteCliente(id)}
      );
  }

  reload() {
    window.location.reload();
  }

  deleteCliente(id: any) {
    this.clientService.deleteClient(id).subscribe(res => {});
  }

}
