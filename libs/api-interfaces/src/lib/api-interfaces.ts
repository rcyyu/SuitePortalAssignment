export enum ServiceType {
  Electrical = 'electrical',
  General = 'general',
  PestControl = 'pest-control',
  Plumbing = 'plumbing',
}

export const ALL_SERVICE_TYPES = [
  ServiceType.Electrical ,
  ServiceType.General ,
  ServiceType.PestControl ,
  ServiceType.Plumbing ,
];

export interface MaintenanceRequest {
  id: string;
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;
  // Is closed
  isClosed?: boolean;
}

export interface User {
  id: string;
  // Name of the user
  name: string;
  // Email of the user
  email: string;
  // Determine if the user is an Admin
  isAdmin: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  sessionToken: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
}