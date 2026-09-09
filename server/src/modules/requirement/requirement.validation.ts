import { z } from 'zod';

const eventDetailsValidationSchema = z.object({
  eventName: z.string().trim().min(1, 'Event name is required'),
  eventType: z.string().trim().min(1, 'Event type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  location: z.string().trim().min(1, 'Location is required'),
  venue: z.string().trim().optional(),
});

export const createRequirementValidationSchema = z.object({
  body: z.object({
    eventDetails: eventDetailsValidationSchema,
    category: z.enum(['EVENT_PLANNER', 'PERFORMER', 'CREW']),
    categoryDetails: z.record(z.string(), z.unknown()),
    logisticsDetails: z.record(z.string(), z.unknown()),
  }),
});