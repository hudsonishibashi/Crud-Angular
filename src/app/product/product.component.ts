import { NotificationService } from './../notification.service';
import { ProductService } from './product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IResponseProduct } from './product';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'value', 'category', 'action'];
  responseProduct!: IResponseProduct;
  erroMessage: string = '';
  dataSource: any;
  next: boolean = false;
  previous: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private notification: NotificationService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe({
      next: product => {
        this.dataSource = new MatTableDataSource(product.content);
        this.responseProduct = product
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

  reload() {
    window.location.reload();
  }

  openDialog(id:any) {
    this.notification.openDialog(
      id, 
      'Deseja realmente excluir?', 
      'Está ação não poderá ser revertida.', 
      this, 
      () => {this.deleteProduct(id)}
      );
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(res => {});
  }

}
