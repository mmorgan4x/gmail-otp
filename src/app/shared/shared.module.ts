import { NgModule } from '@angular/core';

import { FromNowPipe } from '../shared/from-now.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
