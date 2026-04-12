import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TelaLoginProfissional } from './tela-login-profissional/tela-login-profissional';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App, TelaLoginProfissional],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
