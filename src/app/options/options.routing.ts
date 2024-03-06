import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OptionsComponent } from './options.component';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: OptionsComponent }])],
  exports: [RouterModule],
})
export class OptionsRouting { }

