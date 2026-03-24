import { DocumentSearchCriteria } from 'src/app/shared/generated';
import { z, ZodTypeAny } from 'zod';

export const documentSearchCriteriasSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  lifeCycleState: z.array(z.string()).optional(),
  documentTypeId: z.array(z.string()).optional(),
  channelName: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  createBy: z.string().optional(),
  objectReferenceId: z.string().optional(),
  objectReferenceType: z.string().optional(),
  pageNumber: z.number().optional(),
  pageSize: z.number().optional(),
} satisfies Partial<Record<keyof DocumentSearchCriteria, ZodTypeAny>>);

export type DocumentSearchCriteriaSchema = z.infer<
  typeof documentSearchCriteriasSchema
>;
