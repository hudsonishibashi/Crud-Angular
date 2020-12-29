import { NotificationService } from './../notification.service';
import { ClientService } from './client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ResponseIClient } from './models/client';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  //Paginator
  length!:number;
  pageSize:number = 5;
  pageIndex:number = 0;
  offset: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private clientService: ClientService, private notifcation: NotificationService) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.clientService.getClient(this.pageIndex, this.pageSize).subscribe({
      next: clients => {
        this.setPagination(clients['totalElements'], clients['number'], clients['size']);
        this.dataSource = new MatTableDataSource(clients.content);
        this.responseIClients = clients
        this.previous = true;
        //this.dataSource.paginator = this.paginator;
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
      true, 
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

  setPagination(length: number, startIndex: number, pageSize: number) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getClient();
  }

}
