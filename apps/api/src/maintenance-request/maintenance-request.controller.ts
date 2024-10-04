import { BadRequestException, Body, Controller, Post, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('maintenance-requests')
export class MaintenanceRequestController {
  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService
  ) {
    //
  }

  @UseGuards(AuthGuard)
  @Get('/')
  public async getMaintenanceRequestList() {
    return await this.maintenanceRequestService.getMaintenanceRequestsList();
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  public async getAllMaintenanceRequestList() {
    return await this.maintenanceRequestService.getAllMaintenanceRequestsList();
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest
  ) {
    if (!maintenanceRequest?.name) {
      throw new BadRequestException('Must provide a valid name');
    }
    if (!maintenanceRequest?.email) {
      throw new BadRequestException('Must provide a email');
    }
    if (!maintenanceRequest?.unitNumber) {
      throw new BadRequestException('Must provide a valid unit number');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }

    return await this.maintenanceRequestService.createMaintenanceRequest(
      maintenanceRequest
    );
  }

  @Get('/:id')
  public async getMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/close')
  public async closeMaintenanceRequest(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.closeMaintenanceRequest(id);
  }
}