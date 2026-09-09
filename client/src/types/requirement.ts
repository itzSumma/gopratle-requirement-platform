export type RequirementCategory = 'EVENT_PLANNER' | 'PERFORMER' | 'CREW';

// Step 1: Event Basics
export interface EventDetails {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
}

// Step 2: Dynamic Category Details
export interface PerformerDetails {
  performanceType: string;
  duration: string;
  numberOfPerformers: number;
}

export interface PlannerDetails {
  serviceType: string;
  expectedGuests: number;
  planningRequirements: string;
}

export interface CrewDetails {
  crewType: string;
  numberOfCrew: number;
  skillRequirement: string;
}

export type CategoryDetails =
  | PerformerDetails
  | PlannerDetails
  | CrewDetails;

// Step 3: Dynamic Logistics & Budget
export interface PerformerLogistics {
  soundEquipment: string[];
  stageRequirements: string;
  technicalRequirements: string;
  budget: number;
}

export interface PlannerLogistics {
  servicesNeeded: string[];
  budget: number;
  additionalRequirements: string;
}

export interface CrewLogistics {
  workDuration: string;
  shiftTiming: string;
  equipmentRequirement: string;
  budget: number;
  additionalRequirements: string;
}

export type LogisticsDetails =
  | PerformerLogistics
  | PlannerLogistics
  | CrewLogistics;

// Combined Form Payload matching Backend Schema
export interface RequirementFormData {
  eventDetails: EventDetails;
  category: RequirementCategory;
  categoryDetails: CategoryDetails;
  logisticsDetails: LogisticsDetails;
}

export interface RequirementDocument extends RequirementFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}