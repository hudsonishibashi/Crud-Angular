import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleComponent } from './sale.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';

const routes: Routes = [

  { path: 'sale', component: SaleComponent},
  { path: 'createSale', component: CreateSaleComponent},
  //{ path: 'updateProduct/:id', component: UpdateProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
