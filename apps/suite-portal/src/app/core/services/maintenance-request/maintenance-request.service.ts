import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRequestService {
  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  private static readonly MAINTENANCE_API_ENDPOINT = `${environment.apiUrl}/maintenance-requests`;

  submitMaintenanceRequest(request: MaintenanceRequest): Observable<{ id: string }> {
    const url = `${MaintenanceRequestService.MAINTENANCE_API_ENDPOINT}`;
    return this.http.post<{ id: string }>(url, request);
  }

  getAllMaintenanceRequestList(): Observable<MaintenanceRequest[]> {
    const url = `${MaintenanceRequestService.MAINTENANCE_API_ENDPOINT}`;
    console.log(this.authService.getSessionToken())
    return this.http.get<MaintenanceRequest[]>(url, {
      headers: {
        Authorization: this.authService.getSessionToken()
      }
    });
  }

  closeMaintenanceRequest(id: string): Observable<MaintenanceRequest> {
    const url = `${MaintenanceRequestService.MAINTENANCE_API_ENDPOINT}/${id}/close`;
    return this.http.put<MaintenanceRequest>(url, {}, {
      headers: {
        Authorization: this.authService.getSessionToken()
      }
    });
  }
}

