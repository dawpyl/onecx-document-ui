import { DocumentCreateStep } from '../../types/document-create-step.enum';

export interface DocumentCreateViewModel {
  activeStep: DocumentCreateStep;
  submitting: boolean;
  referenceDataLoading: boolean;
  referenceDataLoaded: boolean;
  error: string | null;
}
