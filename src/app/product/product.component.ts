import { CategoryService } from './../category/category.service';
import { NotificationService } from './../notification.service';
import { ProductService } from './product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  categoryName!: string;

  //Paginator
  length!:number;
  pageSize:number = 5;
  pageIndex:number = 0;
  offset: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private notification: NotificationService
    ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct(this.pageIndex, this.pageSize).subscribe({
      next: product => {
        this.setPagination(product['totalElements'], product['number'], product['size']);
        this.dataSource = new MatTableDataSource(product.content);
        this.responseProduct = product
        this.previous = true;
        //this.dataSource.paginator = this.paginator;
        product.content.map(res => {
           this.getCategoryId(res.category).then(name => {
           res.categoryName = name;
         });
        })
      },
      error: err => this.erroMessage = err
    });
  }

  async getCategoryId(id: number): Promise<string> {
    return new Promise(resolve => {
      this.categoryService.getCategoryId(id).subscribe(res => {
      resolve(res.name);
      })
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
      'Deseja realmente excluir esse produto?', 
      'Está ação não poderá ser revertida.',
      true, 
      this, 
      () => {this.deleteProduct(id)}
      );
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(res => {});
  }

  setPagination(length: number, startIndex: number, pageSize: number) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProduct();
  }

}
