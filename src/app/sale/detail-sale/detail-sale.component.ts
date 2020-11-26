import { CategoryService } from './../../category/category.service';
import { ProductService } from './../../product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/client/client.service';
import { SaleService } from '../sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleHasProduct } from '../sale';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/product/product';

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.component.html',
  styleUrls: ['./detail-sale.component.css']
})
export class DetailSaleComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'value', 'category'];
  id: any;
  idSale!: number;
  nameClient!: string;
  products: Array<IProduct> = [];
  dataSource: any;
  erroMessage: string = '';
  previous: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private saleService: SaleService, 
    private clientService: ClientService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSale();
  }

    getSale() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.saleService.getSaleId(this.id).subscribe(async res => {
      this.idSale = res.id
      await this.getProduct(res.saleHasProducts);
      this.dataSource = new MatTableDataSource(this.products);
      this.getClientId(res.idClient).then(name => {
        this.nameClient = name;
      });
    })
  }

  async getProduct(saleHasProduct: SaleHasProduct[]) {
      saleHasProduct.map(res => {
      this.productService.getProductId(res.idProduct).subscribe({
        next: product => {
          this.products.push(product);
          this.products.map(res => {
            this.getCategoryId(res.category).then(name => {
              res.categoryName = name;
            });
          });
          this.previous = true;
          this.dataSource.paginator = this.paginator;
        },
        error: err => this.erroMessage = err
      });
    });
    
  }

  async getClientId(id: number): Promise<string> {
    return new Promise(resolve => {
      this.clientService.getClientId(id).subscribe(res => {
      resolve(res.name);
      })
    })
  }

  async getCategoryId(id: number): Promise<string> {
    return new Promise(resolve => {
      this.categoryService.getCategoryId(id).subscribe(res => {
      resolve(res.name);
      })
    })
  }

  onBack(): void {
    this.router.navigate(['sale']);
  }

}
