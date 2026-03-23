import { SearchDocumentRequest } from 'src/app/shared/generated';
import { z, ZodTypeAny } from 'zod';

export const documentSearchCriteriasSchema = z.object({
  changeMe: z.string().optional(),
  // ACTION S2: Please define the members for your documentSearchCriteriasSchema here
  // https://onecx.github.io/docs/documentation/current/onecx-nx-plugins:generator/search/search-criteria.html#action-2
} satisfies Partial<Record<keyof SearchDocumentRequest, ZodTypeAny>>);

export type DocumentSearchCriteria = z.infer<
  typeof documentSearchCriteriasSchema
>;
