import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [

  { path: 'category', component: CategoryComponent},
  { path: 'createCategory', component: CreateCategoryComponent},
  { path: 'updateCategory/:id', component: UpdateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
