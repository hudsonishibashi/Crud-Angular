import { ClientService } from './client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ResponseIClient } from './client';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  responseIClients!: ResponseIClient;
  erroMessage: string = '';
  dataSource: any;
  next: boolean = false;
  previous: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private clientService: ClientService, public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {id: id, 
      title: 'Deseja realmente excluir?', 
      subTitle: 'Está ação não poderá ser revertida.',
      }});
    dialogRef.afterClosed().subscribe(res => {
      console.log('Dialog fechado!');
    });
  }

  reload() {
    window.location.reload();
  }

}
