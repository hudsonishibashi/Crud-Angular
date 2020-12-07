import { AuthService } from './../login/auth.service';
import { ProductService } from 'src/app/product/product.service';
import { Component, OnInit } from '@angular/core';
import { ICart } from '../common-user/cart';
import { IProduct } from '../product/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  listCart: Array<ICart> = [];
  products: Array<IProduct> = [];
  amount!: number; 
  category: string = '';

  constructor(
    private productService: ProductService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getListProductsCart();
  }

  getListProductsCart() {
    const currentUser = this.authService.currentUserValue;
    this.listCart = JSON.parse(localStorage.getItem(`addCart${currentUser?.id}`) || '{}');
    console.log(`addCart${currentUser?.id}`);
    console.log(this.listCart);
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
        this.getTypeCategory(products, products.category);
        this.products.push(products);
      }
    });
  }

  removeItem(id: number) {
    const index = this.listCart.findIndex(s => s.id === id);
    const currentUser = this.authService.currentUserValue;
    if (index > -1) {
      this.listCart.splice(index, 1);
      localStorage.setItem(`addCart${currentUser?.id}`, JSON.stringify(this.listCart));
      this.getListProductsCart();
      window.location.reload();
    }
  }

  getTypeCategory(product: IProduct, category: number) {
    switch (category) {
      case 2:
        product.categoryName = 'products/bebidas'
        break;
      case 6:
        product.categoryName = 'products/docerias'
        break;
      case 9:
        product.categoryName = 'products/padaria'    
        break;
      default:
        break;
    }
  }
  
}
