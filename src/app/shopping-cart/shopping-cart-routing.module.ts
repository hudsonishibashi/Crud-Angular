import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartComponent } from './shopping-cart.component';


const routes: Routes = [

  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard], data: {roles: [false]}},
  { path: 'checkout', component: CheckoutComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
