import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequest,
} from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from '../../core/services/maintenance-request/maintenance-request.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MaintenanceRequestService],
})
export class HomeComponent implements OnInit {
  maintenanceForm: FormGroup;
  serviceTypes = [];

  constructor(private service: MaintenanceRequestService) {}

  onSubmit(): void {
    const request: MaintenanceRequest = this.maintenanceForm.value;
    this.service.submitMaintenanceRequest(request).subscribe({
      complete: () => {
        this.maintenanceForm.reset();
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.serviceTypes = ALL_SERVICE_TYPES;
    this.maintenanceForm = new FormGroup({
      unitNumber: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      serviceType: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      details: new FormControl(''),
    });
  }
}
