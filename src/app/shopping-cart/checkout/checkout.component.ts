import { NotificationService } from './../../notification.service';
import { SaleService } from './../../sale/sale.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ICart } from 'src/app/common-user/cart';
import { AuthService } from 'src/app/login/auth.service';
import { IProduct } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listCart: Array<ICart> = [];
  products: Array<IProduct> = []; 
  category: string = '';
  valueTotal: number = 0;
  saleForm!: FormGroup;
  
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private saleService: SaleService,
    private router: Router,
    private fb: FormBuilder,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getListProductsCart();
  }

  setSale() {
    const currentUser = this.authService.currentUserValue;
    this.saleForm = this.fb.group({
      totalValue: this.valueTotal,
      idClient: currentUser?.id,
      saleHasProducts: this.setArray(this.listCart)
    });
  }

  setArray(listCart: ICart[]) {
    let formArray = this.fb.array([]);
    listCart.forEach(element => formArray.push(
      this.fb.group({
        idProduct: element.id,
        qtdProduct: element.amount
      })
    ));
    return formArray;
  }

  getListProductsCart() {
    const currentUser = this.authService.currentUserValue;
    this.listCart = JSON.parse(localStorage.getItem(`addCart${currentUser?.id}`) || '{}');
    if (this.listCart.values != null) {
      this.listCart.map(res => {
        this.getProductId(res.id, res.amount);
      });
    }
  }

  getProductId(id: number, amount: number) {
    this.productService.getProductId(id).subscribe({
      next: products => {
        products.amount = amount;
        this.valueTotal += products.value * products.amount;
        this.products.push(products);
        this.setSale();
      }
    });
  }

  returnPage() {
    this.router.navigate(['/cart']);
  }

  checkout() {
    this.notification.openDialog(
      0,
      'Deseja realmente finalizar essa compra?', 
      'Está ação não poderá ser revertida.',
      true, 
      this, 
      () => {
        this.saleService.createSale(this.saleForm.value).subscribe(res => {
        });
        this.saleForm.reset();
        this.notification.openDialog(
          0,
          'Compra realizada com sucesso!', 
          '',
          false, 
          this, 
          () => {
            this.router.navigate(['/cart']);
          }
        );
      }
    );
  }

}
