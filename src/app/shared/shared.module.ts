import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FromNowPipe } from '@shared/from-now.pipe';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    FromNowPipe,
  ],
  declarations: [
    FromNowPipe,
  ],

})
export class SharedModule { }
