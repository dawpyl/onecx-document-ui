import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AttachmentData,
  DocumentCharacteristicFormValue,
  DocumentDetailsFormValue,
} from '../../types/document-create.types';
import { DocumentCreateStep } from '../../types/document-create-step.enum';

export const DocumentCreateActions = createActionGroup({
  source: 'DocumentCreate',
  events: {
    'entered page': emptyProps(),
    'go to previous step': props<{ currentStep: DocumentCreateStep }>(),
    'back clicked': emptyProps(),
    'go to next step': props<{ currentStep: DocumentCreateStep }>(),
    'details step patched': props<{
      details: Partial<
        Omit<DocumentDetailsFormValue, 'attachments' | 'characteristics'>
      >;
    }>(),
    'attachments step patched': props<{
      attachments: AttachmentData[];
    }>(),
    'characteristics step patched': props<{
      characteristics: DocumentCharacteristicFormValue[];
    }>(),
    'step validation failed': props<{ error: string }>(),
    'submit clicked': emptyProps(),
    'submit finished': emptyProps(),
    'reset clicked': emptyProps(),
    'clear error': emptyProps(),
  },
});
