import { Schema, model } from 'mongoose';
import { IRequirement } from './requirement.interface.js';

const eventDetailsSchema = new Schema(
  {
    eventName: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
  },
  { _id: false }
);

const requirementSchema = new Schema<IRequirement>(
  {
    eventDetails: {
      type: eventDetailsSchema,
      required: true,
    },

    category: {
      type: String,
      enum: ['EVENT_PLANNER', 'PERFORMER', 'CREW'],
      required: true,
    },

    categoryDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },

    logisticsDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Requirement = model<IRequirement>(
  'Requirement',
  requirementSchema
);