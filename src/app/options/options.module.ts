import { NgModule } from '@angular/core';

import { OptionsComponent } from './options.component';
import { SharedModule } from '../shared/shared.module';
import { OptionsRouting } from './options.routing';

@NgModule({
  imports: [
    OptionsRouting,
    SharedModule
  ],
  declarations: [
    OptionsComponent,
  ],
})
export class OptionsModule { }
