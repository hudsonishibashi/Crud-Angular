import { DeactivateGuard } from './../guards/deactivate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductComponent } from './product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [

  { path: 'product', component: ProductComponent},
  { path: 'createProduct', component: CreateProductComponent,
    canDeactivate: [DeactivateGuard]
  },
  { path: 'updateProduct/:id', component: UpdateProductComponent,
    canDeactivate: [DeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
