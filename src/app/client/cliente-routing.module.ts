import { DeactivateGuard } from './../guards/deactivate.guard';
import { UpdateClientComponent } from './update-client/update-client.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [

  { path: 'client', component: ClientComponent},
  { path: 'createClient', component: CreateClientComponent,
    canDeactivate: [DeactivateGuard]  
  },
  { path: 'updateClient/:id', component: UpdateClientComponent,
    canDeactivate: [DeactivateGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
