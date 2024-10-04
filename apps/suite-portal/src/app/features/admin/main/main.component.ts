import { Component, OnInit } from '@angular/core';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { MaintenanceRequestService } from '../../../core/services/maintenance-request/maintenance-request.service';

@Component({
  selector: 'pm-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MaintenanceRequestService]
})
export class MainComponent implements OnInit {  
  requests: MaintenanceRequest[];
  displayedColumns: string[] = [
    'id',
    'status',
    'serviceType',
    'unitNumber',
    'name',
    'email',
    'close'
  ];


  constructor(private service: MaintenanceRequestService) {}
 
  ngOnInit(): void {
    this.service.getAllMaintenanceRequestList().subscribe(data => this.requests = data);
  }

  onClick(request: MaintenanceRequest): void {
    this.service.closeMaintenanceRequest(request.id).subscribe({
      next: (_res) => {
        this.service.getAllMaintenanceRequestList().subscribe(data => this.requests = data);
      } 
    });
  }
}
