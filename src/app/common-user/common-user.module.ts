import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

import { CommonUserComponent } from './common-user.component';



@NgModule({
  declarations: [
    CommonUserComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class CommonUserModule { }
