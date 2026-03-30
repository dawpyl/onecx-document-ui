import { createReducer, on } from '@ngrx/store';
import { DocumentCreateOperationsActions } from '../../operations/document-create-operations.actions';
import { DocumentCreateStep } from '../../types/document-create-step.enum';
import { DocumentCreateActions } from './document-create.actions';
import { DocumentCreateState } from './document-create.state';

export const initialState: DocumentCreateState = {
  activeStep: DocumentCreateStep.Details,
  details: null,
  attachments: [],
  characteristics: [],
  referenceDataLoading: false,
  referenceDataLoaded: false,
  availableDocumentTypes: [],
  availableMimeTypes: [],
  submitting: false,
  error: null,
};

export const documentCreateReducer = createReducer(
  initialState,
  on(
    DocumentCreateActions.enteredPage,
    (state): DocumentCreateState => ({
      ...state,
      error: null,
      referenceDataLoading:
        !state.availableDocumentTypes.length ||
        !state.availableMimeTypes.length,
    })
  ),
  on(
    DocumentCreateActions.goToNextStep,
    (state, { currentStep: step }): DocumentCreateState => {
      const targetStep = getNextStep(step);
      return {
        ...state,
        activeStep: targetStep,
        error: null,
      };
    }
  ),
  on(
    DocumentCreateActions.goToPreviousStep,
    (state, { currentStep: step }): DocumentCreateState => {
      const targetStep = getPreviousStep(step);
      return {
        ...state,
        activeStep: targetStep,
        error: null,
      };
    }
  ),
  on(
    DocumentCreateActions.detailsStepPatched,
    (state, { details }): DocumentCreateState => ({
      ...state,
      details: {
        ...(state.details ?? {}),
        ...details,
      },
      error: null,
    })
  ),
  on(
    DocumentCreateActions.attachmentsStepPatched,
    (state, { attachments }): DocumentCreateState => ({
      ...state,
      attachments,
      error: null,
    })
  ),
  on(
    DocumentCreateActions.characteristicsStepPatched,
    (state, { characteristics }): DocumentCreateState => ({
      ...state,
      characteristics,
      error: null,
    })
  ),
  on(
    DocumentCreateActions.submitClicked,
    (state): DocumentCreateState => ({
      ...state,
      submitting: true,
      error: null,
    })
  ),
  on(
    DocumentCreateActions.submitFinished,
    (state): DocumentCreateState => ({
      ...state,
      submitting: false,
    })
  ),
  on(
    DocumentCreateActions.stepValidationFailed,
    (state, { error }): DocumentCreateState => ({
      ...state,
      error,
    })
  ),
  on(
    DocumentCreateActions.clearError,
    (state): DocumentCreateState => ({
      ...state,
      error: null,
    })
  ),
  on(
    DocumentCreateActions.resetClicked,
    (): DocumentCreateState => ({
      ...initialState,
    })
  ),
  on(
    DocumentCreateOperationsActions.ensureReferenceDataLoaded,
    (state): DocumentCreateState => ({
      ...state,
      referenceDataLoading: !state.referenceDataLoaded,
      error: null,
    })
  ),
  on(
    DocumentCreateOperationsActions.availableDocumentTypesReceived,
    (state, { types }): DocumentCreateState => ({
      ...state,
      availableDocumentTypes: types,
      referenceDataLoaded: !!types.length && !!state.availableMimeTypes.length,
      referenceDataLoading: !state.availableMimeTypes.length,
      error: null,
    })
  ),
  on(
    DocumentCreateOperationsActions.availableMimeTypesReceived,
    (state, { mimeTypes }): DocumentCreateState => ({
      ...state,
      availableMimeTypes: mimeTypes,
      referenceDataLoaded:
        !!mimeTypes.length && !!state.availableDocumentTypes.length,
      referenceDataLoading: !state.availableDocumentTypes.length,
      error: null,
    })
  ),
  on(
    DocumentCreateOperationsActions.loadReferenceDataFailed,
    (state, { error }): DocumentCreateState => ({
      ...state,
      referenceDataLoading: false,
      referenceDataLoaded: false,
      error: error ?? null,
    })
  ),
  on(
    DocumentCreateOperationsActions.documentCreationCompleted,
    DocumentCreateOperationsActions.documentCreationFailed,
    DocumentCreateOperationsActions.documentCreationFinalStepFailed,
    (state): DocumentCreateState => ({
      ...state,
      submitting: false,
    })
  )
);

function getPreviousStep(step: DocumentCreateStep): DocumentCreateStep {
  if (step === DocumentCreateStep.Characteristics) {
    return DocumentCreateStep.Attachments;
  }
  return DocumentCreateStep.Details;
}

function getNextStep(step: DocumentCreateStep): DocumentCreateStep {
  if (step === DocumentCreateStep.Details) {
    return DocumentCreateStep.Attachments;
  }
  return DocumentCreateStep.Characteristics;
}
