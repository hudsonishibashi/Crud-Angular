import { ShortNamePipe } from './short-name.pipe';
import { ReplacePipe } from './replace.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ReplacePipe,
    ShortNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReplacePipe,
    ShortNamePipe
  ]
})
export class SharedModule { }
