import { DeactivateGuard } from './guards/deactivate.guard';
import { PurchasesHistoryComponent } from './purchases-history/purchases-history.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CommonUserComponent } from './common-user/common-user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CategoryComponent } from './category/category.component';
import { SaleComponent } from './sale/sale.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent, canDeactivate: [DeactivateGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: [true]}},
  { path: 'common', component: CommonUserComponent, canActivate: [AuthGuard], data: {roles: [false]}},
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard], data: {roles: [true]}},
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: {roles: [true]}},
  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard], data: {roles: [true]}},
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard], data: {roles: [false]}},
  { path: 'history', component: PurchasesHistoryComponent, canActivate: [AuthGuard], data: {roles: [false]}},
  { path:'', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
