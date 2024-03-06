import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './popup.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: PopupComponent }])],
  exports: [RouterModule],
})
export class PopupRouting { }

