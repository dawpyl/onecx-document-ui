import {
  AttachmentDraft,
  DocumentCharacteristicFormValue,
  DocumentCreateDetailsStepData,
} from '../../types/document-create.types';
import { DocumentType, SupportedMimeType } from 'src/app/shared/generated';
import { DocumentCreateStep } from '../../types/document-create-step.enum';

export interface DocumentCreateState {
  activeStep: DocumentCreateStep;
  details: Partial<DocumentCreateDetailsStepData> | null;
  attachments: AttachmentDraft[];
  characteristics: DocumentCharacteristicFormValue[];
  referenceDataLoading: boolean;
  referenceDataLoaded: boolean;
  availableDocumentTypes: DocumentType[];
  availableMimeTypes: SupportedMimeType[];
  submitting: boolean;
  error: string | null;
}
