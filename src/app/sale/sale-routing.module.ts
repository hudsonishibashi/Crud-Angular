import { UpdateSaleComponent } from './update-sale/update-sale.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleComponent } from './sale.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { DetailSaleComponent } from './detail-sale/detail-sale.component';

const routes: Routes = [

  { path: 'sale', component: SaleComponent},
  { path: 'createSale', component: CreateSaleComponent},
  { path: 'updateSale/:id', component: UpdateSaleComponent},
  { path: 'detailSale/:id', component: DetailSaleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
