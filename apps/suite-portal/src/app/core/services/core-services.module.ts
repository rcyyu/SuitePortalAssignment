import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaintenanceRequestService } from './maintenance-request/maintenance-request.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [MaintenanceRequestService, AuthService]
})
export class CoreServiceModule { }
