import { SaleComponent } from './sale.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: 'sale', component: SaleComponent},
  //{ path: 'createProduct', component: CreateProductComponent},
  //{ path: 'updateProduct/:id', component: UpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
