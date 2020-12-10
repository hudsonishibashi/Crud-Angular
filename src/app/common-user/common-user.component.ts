import { NotificationService } from './../notification.service';
import { AuthService } from './../login/auth.service';
import { IProduct } from 'src/app/product/product';
import { ProductService } from './../product/product.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { ICart } from './cart';

@Component({
  selector: 'app-common-user',
  templateUrl: './common-user.component.html',
  styleUrls: ['./common-user.component.css']
})
export class CommonUserComponent implements OnInit {
  products!: IProduct[];
  category!: number;
  color: ThemePalette = 'warn';
  amount = new FormControl(1, [Validators.min(1)]);
  listCart: Array<ICart> = [];
  listFilter!: string;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    localStorage.setItem(`addCart${currentUser?.id}`, JSON.stringify(this.listCart));
    this.listCart = JSON.parse(localStorage.getItem(`addCart${currentUser?.id}`) || '{}');
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe(res => {
      this.products = res.content;
    });
  }

  addCart(idProduct: any) {
    const currentUser = this.authService.currentUserValue;
    this.listCart.push({id: idProduct, amount: this.amount.value});
    console.log(this.amount.value);
    localStorage.setItem(`addCart${currentUser?.id}`, JSON.stringify(this.listCart));
    this.notification.openDialog(
      0,
      'Item adicionado ao carrinho!', 
      '',
      false, 
      this, 
      () => {}
    );
  }

}
