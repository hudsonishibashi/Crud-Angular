import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleRoutingModule } from './sale-routing.module';
import {MatCardModule} from '@angular/material/card';

import { SaleComponent } from './sale.component';
import { CreateSaleComponent } from './create-sale/create-sale.component';
import { UpdateSaleComponent } from './update-sale/update-sale.component';
import { DetailSaleComponent } from './detail-sale/detail-sale.component';



@NgModule({
  declarations: [
    SaleComponent,
    CreateSaleComponent,
    UpdateSaleComponent,
    DetailSaleComponent
  ],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatCardModule,
    SaleRoutingModule,
  ]
})
export class SaleModule { }
