import { FormsModule } from '@angular/forms';
import { PurchasesHistoryComponent } from './purchases-history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    PurchasesHistoryComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatIconModule
  ]
})
export class PurchasesHistoryModule { }
