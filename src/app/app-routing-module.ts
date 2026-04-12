import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelaLoginProfissional } from './tela-login-profissional/tela-login-profissional';

const routes: Routes = [
  {path: 'login-profissional', component: TelaLoginProfissional},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
