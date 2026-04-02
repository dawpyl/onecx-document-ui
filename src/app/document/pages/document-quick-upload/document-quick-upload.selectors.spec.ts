import {
  selectQuickUploadDocumentTypes,
  selectQuickUploadMimeTypes,
} from './document-quick-upload.selectors';

describe('DocumentQuickUploadSelectors', () => {
  describe('selectQuickUploadDocumentTypes', () => {
    it('should map DocumentType[] to SelectItem[] with label=name and value=id', () => {
      const types = [
        { id: 't1', name: 'Invoice' },
        { id: 't2', name: 'Contract' },
      ] as any;
      const result = selectQuickUploadDocumentTypes.projector(types);
      expect(result).toEqual([
        { label: 'Invoice', value: 't1' },
        { label: 'Contract', value: 't2' },
      ]);
    });

    it('should return empty array when types array is empty', () => {
      expect(selectQuickUploadDocumentTypes.projector([])).toEqual([]);
    });
  });

  describe('selectQuickUploadMimeTypes', () => {
    it('should map SupportedMimeType[] to SelectItem[] with label=name and value=id', () => {
      const mimeTypes = [
        { id: 'm1', name: 'application/pdf' },
        { id: 'm2', name: 'image/png' },
      ] as any;
      const result = selectQuickUploadMimeTypes.projector(mimeTypes);
      expect(result).toEqual([
        { label: 'application/pdf', value: 'm1' },
        { label: 'image/png', value: 'm2' },
      ]);
    });

    it('should return empty array when mimeTypes array is empty', () => {
      expect(selectQuickUploadMimeTypes.projector([])).toEqual([]);
    });
  });
});
