import { ClientService } from './../client/client.service';
import { IClient } from './../client/client';
import { SaleService } from './sale.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IResponseSale } from './sale';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  displayedColumns: string[] = ['id', 'totalValue', 'data', 'idClient', 'action'];
  responseSale!: IResponseSale;
  erroMessage: string = '';
  dataSource: any;
  next: boolean = false;
  previous: boolean = false;
  clientId!: number;
  clientName!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private saleService: SaleService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getSale();
  }

  getSale() {
    this.saleService.getSale().subscribe({
      next: sales => {
        this.dataSource = new MatTableDataSource(sales.content);
        this.responseSale = sales
        this.previous = true;
        this.dataSource.paginator = this.paginator;
        sales.content.map(res => {
          this.getClientId(res.idClient).then(name => {
            res.clientName = name;
          });
        });
      },
      error: err => this.erroMessage = err
    });
  }

  async getClientId(id: number): Promise<string> {
    return new Promise(resolve => {
      this.clientService.getClientId(id).subscribe(res => {
        resolve(res.name);
      });
    }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reload() {
    window.location.reload();
  }

}
