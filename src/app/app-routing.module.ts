import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'client', component: ClientComponent},
  { path: 'category', component: CategoryComponent},
  { path:'', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
