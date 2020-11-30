import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CategoryComponent } from './category/category.component';
import { SaleComponent } from './sale/sale.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard]},
  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard]},
  { path:'', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
