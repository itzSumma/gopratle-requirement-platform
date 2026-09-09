import { Document } from 'mongoose';

export type TRequirementCategory =
  | 'EVENT_PLANNER'
  | 'PERFORMER'
  | 'CREW';

export interface IEventDetails {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue?: string;
}

export interface IRequirement extends Document {
  eventDetails: IEventDetails;
  category: TRequirementCategory;
  categoryDetails: Record<string, unknown>;
  logisticsDetails: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}