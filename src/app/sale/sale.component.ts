import { NotificationService } from './../notification.service';
import { ClientService } from './../client/client.service';
import { SaleService } from './sale.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  //Paginator
  length!:number;
  pageSize:number = 5;
  pageIndex:number = 0;
  offset: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private saleService: SaleService, 
    private clientService: ClientService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.getSale();
  }

  getSale() {
    this.saleService.getSale(this.pageIndex, this.pageSize).subscribe({
      next: sales => {
        this.setPagination(sales['totalElements'], sales['number'], sales['size']);
        this.dataSource = new MatTableDataSource(sales.content);
        this.responseSale = sales
        this.previous = true;
        //this.dataSource.paginator = this.paginator;
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

  openDialog(id:any) {
    this.notification.openDialog(
      id, 
      'Deseja realmente excluir essa venda?', 
      'Está ação não poderá ser revertida.', 
      true,
      this, 
      () => {this.deleteSale(id)}
      );
  }

  deleteSale(id: any) {
    this.saleService.deleteSale(id).subscribe(res => {});
  }

  setPagination(length: number, startIndex: number, pageSize: number) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getSale();
  }

}
