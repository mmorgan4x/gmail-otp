import { Component, } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class OptionsComponent {

}