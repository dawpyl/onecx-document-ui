import { DocumentCreateOperationsActions } from '../../operations/document-create-operations.actions';
import {
  documentQuickUploadReducer,
  initialState,
} from './document-quick-upload.reducers';

describe('DocumentQuickUploadReducer', () => {
  describe('ensureReferenceDataLoaded', () => {
    it('should set optionsLoading=true when neither types nor mimeTypes are loaded', () => {
      const state = documentQuickUploadReducer(
        initialState,
        DocumentCreateOperationsActions.ensureReferenceDataLoaded()
      );
      expect(state.optionsLoading).toBe(true);
    });

    it('should set optionsLoading=false when both types and mimeTypes are already loaded', () => {
      const preState = {
        ...initialState,
        mimeTypesLoaded: true,
        documentTypesLoaded: true,
      };
      const state = documentQuickUploadReducer(
        preState,
        DocumentCreateOperationsActions.ensureReferenceDataLoaded()
      );
      expect(state.optionsLoading).toBe(false);
    });
  });

  describe('availableDocumentTypesReceived', () => {
    it('should store types, set documentTypesLoaded=true and keep optionsLoading=true when mimeTypes not yet loaded', () => {
      const types = [{ id: 't1', name: 'Invoice' }] as any;
      const state = documentQuickUploadReducer(
        initialState,
        DocumentCreateOperationsActions.availableDocumentTypesReceived({ types })
      );
      expect(state.availableDocumentTypes).toEqual(types);
      expect(state.documentTypesLoaded).toBe(true);
      expect(state.optionsLoading).toBe(true);
    });

    it('should set optionsLoading=false when mimeTypes are already loaded', () => {
      const preState = { ...initialState, mimeTypesLoaded: true };
      const types = [{ id: 't1' }] as any;
      const state = documentQuickUploadReducer(
        preState,
        DocumentCreateOperationsActions.availableDocumentTypesReceived({ types })
      );
      expect(state.optionsLoading).toBe(false);
    });
  });

  describe('availableMimeTypesReceived', () => {
    it('should store mimeTypes, set mimeTypesLoaded=true and keep optionsLoading=true when types not yet loaded', () => {
      const mimeTypes = [{ id: 'm1', name: 'application/pdf' }] as any;
      const state = documentQuickUploadReducer(
        initialState,
        DocumentCreateOperationsActions.availableMimeTypesReceived({ mimeTypes })
      );
      expect(state.availableMimeTypes).toEqual(mimeTypes);
      expect(state.mimeTypesLoaded).toBe(true);
      expect(state.optionsLoading).toBe(true);
    });

    it('should set optionsLoading=false when document types are already loaded', () => {
      const preState = { ...initialState, documentTypesLoaded: true };
      const mimeTypes = [{ id: 'm1' }] as any;
      const state = documentQuickUploadReducer(
        preState,
        DocumentCreateOperationsActions.availableMimeTypesReceived({ mimeTypes })
      );
      expect(state.optionsLoading).toBe(false);
    });
  });

  describe('startDocumentCreation', () => {
    it('should set optionsLoading=true', () => {
      const state = documentQuickUploadReducer(
        initialState,
        DocumentCreateOperationsActions.startDocumentCreation({
          docRequest: {} as any,
          files: [],
        })
      );
      expect(state.optionsLoading).toBe(true);
    });
  });

  describe('requestDocumentUploadUrls', () => {
    it('should set pendingAttachmentUploads to files count and reset id arrays', () => {
      const preState = {
        ...initialState,
        successfulAttachmentIds: ['old-1'],
        failedAttachmentIds: ['old-2'],
      };
      const files = [{} as any, {} as any];
      const state = documentQuickUploadReducer(
        preState,
        DocumentCreateOperationsActions.requestDocumentUploadUrls({
          createdDocument: {} as any,
          uploadRequests: [],
          files,
        })
      );
      expect(state.pendingAttachmentUploads).toBe(2);
      expect(state.successfulAttachmentIds).toEqual([]);
      expect(state.failedAttachmentIds).toEqual([]);
    });
  });

  describe('uploadAttachmentSuccess', () => {
    it('should add attachmentId to successfulIds and decrement pending count', () => {
      const preState = {
        ...initialState,
        pendingAttachmentUploads: 2,
        successfulAttachmentIds: [],
      };
      const state = documentQuickUploadReducer(
        preState,
        DocumentCreateOperationsActions.uploadAttachmentSuccess({
          documentId: 'doc-1',
          attachmentId: 'att-1',
        })
      );
      expect(state.successfulAttachmentIds).toContain('att-1');
      expect(state.pendingAttachmentUploads).toBe(1);
    });
  });

  describe('attachmentUploadFailed', () => {
    it('should add attachmentId to failedIds and decrement pending count', () => {
      const preState = {
        ...initialState,
        pendingAttachmentUploads: 3,
        failedAttachmentIds: [],
      };
      const state = documentQuickUploadReducer(
        preState,
        DocumentCreateOperationsActions.attachmentUploadFailed({
          documentId: 'doc-1',
          attachmentId: 'att-2',
        })
      );
      expect(state.failedAttachmentIds).toContain('att-2');
      expect(state.pendingAttachmentUploads).toBe(2);
    });
  });

  describe('terminal actions reset to initial state', () => {
    const dirtyState = {
      optionsLoading: true,
      mimeTypesLoaded: true,
      documentTypesLoaded: true,
      availableDocumentTypes: [{ id: 't1' }] as any,
      availableMimeTypes: [{ id: 'm1' }] as any,
      pendingAttachmentUploads: 1,
      successfulAttachmentIds: ['att-ok'],
      failedAttachmentIds: ['att-fail'],
    };

    const terminalActions = [
      DocumentCreateOperationsActions.documentCreationCompleted({ documentId: '1' }),
      DocumentCreateOperationsActions.documentCreationFinalStepFailed({ documentId: '1' }),
      DocumentCreateOperationsActions.documentCreationFailed(),
      DocumentCreateOperationsActions.loadReferenceDataFailed({ error: 'err' }),
    ];

    terminalActions.forEach((action) => {
      it(`should reset state with optionsLoading=false on ${action.type}`, () => {
        const state = documentQuickUploadReducer(dirtyState, action);
        expect(state.optionsLoading).toBe(false);
        expect(state.pendingAttachmentUploads).toBe(0);
        expect(state.successfulAttachmentIds).toEqual([]);
        expect(state.failedAttachmentIds).toEqual([]);
      });
    });
  });
});
