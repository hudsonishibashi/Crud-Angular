import { IProduct } from 'src/app/product/product';
import { ProductService } from './../product/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-user',
  templateUrl: './common-user.component.html',
  styleUrls: ['./common-user.component.css']
})
export class CommonUserComponent implements OnInit {
  products!: IProduct[];
  category!: number;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe(res => {
      this.products = res.content;
      this.products.map(category => {
        this.category = category.category;
      })
    })
  }

}
