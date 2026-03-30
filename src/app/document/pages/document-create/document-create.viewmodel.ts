import { DocumentCreateStep } from '../../types/document-create-step.enum';
import {
  AttachmentData,
  DocumentCharacteristicFormValue,
  DocumentCreateDetailsStepData,
} from '../../types/document-create.types';

export interface DocumentCreateViewModel {
  activeStep: DocumentCreateStep;
  details: Partial<DocumentCreateDetailsStepData> | null;
  attachments: AttachmentData[];
  characteristics: DocumentCharacteristicFormValue[];
  submitting: boolean;
  referenceDataLoading: boolean;
  referenceDataLoaded: boolean;
  error: string | null;
}
