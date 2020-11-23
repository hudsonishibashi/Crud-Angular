import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductComponent } from './product.component';

const routes: Routes = [

  { path: 'product', component: ProductComponent},
  { path: 'createProduct', component: CreateProductComponent},
  //{ path: 'updateCategory/:id', component: UpdateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
