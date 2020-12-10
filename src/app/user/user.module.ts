import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule
  ]
})
export class UserModule { }
