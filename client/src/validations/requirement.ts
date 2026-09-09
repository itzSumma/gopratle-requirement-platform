
import { z } from 'zod';

// Step 1: Event Basics Schema
export const eventDetailsSchema = z
  .object({
    eventName: z.string().trim().min(1, 'Event name is required'),
    eventType: z.string().trim().min(1, 'Event type is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    location: z.string().trim().min(1, 'Location is required'),
    venue: z.string().trim().optional(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End date cannot be earlier than start date',
    path: ['endDate'],
  });

export const stepOneSchema = z.object({
  eventDetails: eventDetailsSchema,
  category: z.enum(['EVENT_PLANNER', 'PERFORMER', 'CREW']),
});

// Step 2: Category Details Schemas
export const performerDetailsSchema = z.object({
  performanceType: z.string().trim().min(1, 'Performance type is required'),
  duration: z.string().trim().min(1, 'Performance duration is required'),
  numberOfPerformers: z.coerce
    .number()
    .min(1, 'At least 1 performer is required'),
});

export const plannerDetailsSchema = z.object({
  serviceType: z.string().trim().min(1, 'Service type is required'),
  expectedGuests: z.coerce
    .number()
    .min(1, 'Expected guest count must be at least 1'),
  planningRequirements: z
    .string()
    .trim()
    .min(1, 'Planning requirements are required'),
});

export const crewDetailsSchema = z.object({
  crewType: z.string().trim().min(1, 'Crew type is required'),
  numberOfCrew: z.coerce
    .number()
    .min(1, 'At least 1 crew member is required'),
  skillRequirement: z
    .string()
    .trim()
    .min(1, 'Skill/experience requirement is required'),
});

// Step 3: Logistics & Budget Schemas
export const performerLogisticsSchema = z.object({
  soundEquipment: z
    .array(z.string())
    .min(1, 'Select at least one equipment option'),
  stageRequirements: z
    .string()
    .trim()
    .min(1, 'Stage requirements are required'),
  technicalRequirements: z
    .string()
    .trim()
    .min(1, 'Technical requirements are required'),
  budget: z.coerce.number().min(1, 'Budget must be greater than 0'),
});

export const plannerLogisticsSchema = z.object({
  servicesNeeded: z
    .array(z.string())
    .min(1, 'Select at least one required service'),
  budget: z.coerce.number().min(1, 'Budget must be greater than 0'),
  additionalRequirements: z.string().trim().optional().default(''),
});

export const crewLogisticsSchema = z.object({
  workDuration: z.string().trim().min(1, 'Work duration is required'),
  shiftTiming: z.string().trim().min(1, 'Shift timing is required'),
  equipmentRequirement: z
    .string()
    .trim()
    .min(1, 'Equipment requirement is required'),
  budget: z.coerce.number().min(1, 'Budget must be greater than 0'),
  additionalRequirements: z.string().trim().optional().default(''),
});

