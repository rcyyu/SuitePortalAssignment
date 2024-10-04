import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [LoginComponent, MainComponent],
  exports: [LoginComponent, MainComponent]
})
export class AdminModule { }
