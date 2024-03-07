import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FromNowPipe } from '@shared/pipes/from-now.pipe';
import { PopupLinkDirective } from '@shared/directives/popup-link.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    FromNowPipe,
    PopupLinkDirective
  ],
  declarations: [
    FromNowPipe,
    PopupLinkDirective
  ],
})
export class SharedModule { }
