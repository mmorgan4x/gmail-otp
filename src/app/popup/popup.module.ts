import { NgModule } from '@angular/core';
import { PopupComponent } from './popup.component';
import { SharedModule } from '../shared/shared.module';
import { PopupRouting } from './popup.routing';


@NgModule({
  imports: [
    PopupRouting,
    SharedModule
  ],
  declarations: [
    PopupComponent,
  ],
})
export class PopupModule { }
