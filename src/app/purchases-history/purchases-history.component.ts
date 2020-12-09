import { ProductService } from './../product/product.service';
import { AuthService } from './../login/auth.service';
import { SaleService } from './../sale/sale.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ISale, SaleHasProduct } from '../sale/sale';
import { IProduct } from '../product/product';

@Component({
  selector: 'app-purchases-history',
  templateUrl: './purchases-history.component.html',
  styleUrls: ['./purchases-history.component.css']
})
export class PurchasesHistoryComponent implements OnInit {
  listSale!: ISale[];
  userId: any;
  messageNotHistory: boolean = false;

  constructor(
    private saleService: SaleService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    this.userId = currentUser?.id;
    this.getSale();
  }

  getSale() {
    this.saleService.getSale().subscribe(res => {
      this.listSale = res.content;
      this.getSaleHasProduct(this.listSale);
    });
  }

  async getSaleHasProduct(listSale: ISale[]) {
    const currentUser = this.authService.currentUserValue;
    this.userId = currentUser?.id;
    listSale.map(element => {
      if (element.idClient === currentUser?.id) {
        this.getProduct(element.saleHasProducts);
        this.messageNotHistory = true;
      }
    });
  }

   getProduct(saleHasProduct: SaleHasProduct[]) {
   saleHasProduct.map(res => {
      this.productService.getProductId(res.idProduct).subscribe({
        next: product => {
          res.products = product;
        }
      });
   });
  }

  returnPage() {
    this.router.navigate(['/common'])
  }

}
