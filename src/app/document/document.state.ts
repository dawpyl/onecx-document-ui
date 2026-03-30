import { DocumentCreateState } from './pages/document-create/document-create.state';
import { DocumentDetailsState } from './pages/document-details/document-details.state';
import { DocumentQuickUploadState } from './pages/document-quick-upload/document-quick-upload.state';
import { DocumentSearchState } from './pages/document-search/document-search.state';
export interface DocumentState {
  create: DocumentCreateState;
  details: DocumentDetailsState;

  search: DocumentSearchState;
  quickUpload: DocumentQuickUploadState;
}
