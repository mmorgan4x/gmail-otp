import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'popup', loadComponent: () => import('./popup/popup.component').then((m) => m.PopupComponent) },
  { path: 'options', loadComponent: () => import('./options/options.component').then((m) => m.OptionsComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
