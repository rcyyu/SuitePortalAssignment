import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import {
  MaintenanceRequestDao,
  MaintenanceRequestDB,
} from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {
  constructor(private readonly maintReqDao: MaintenanceRequestDao) {
    //
  }

  async getMaintenanceRequestsList() {
    return await this.maintReqDao.getOpenMaintenanceRequests();
  }

  async getAllMaintenanceRequestsList() {
    return await this.maintReqDao.getAllMaintenanceRequests();
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }

  async closeMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.closeMaintenanceRequest(id);
  }
}