import {
  DataTableColumn,
  DiagramComponentState,
  InteractiveDataViewComponentState,
  SearchHeaderComponentState,
} from '@onecx/portal-integration-angular';
import { Document } from 'src/app/shared/generated';
import { DocumentSearchCriteria } from './document-search.parameters';

export interface DocumentSearchState {
  columns: DataTableColumn[];
  results: Document[];
  chartVisible: boolean;
  resultComponentState: InteractiveDataViewComponentState | null;
  searchHeaderComponentState: SearchHeaderComponentState | null;
  diagramComponentState: DiagramComponentState | null;
  searchLoadingIndicator: boolean;
  criteria: DocumentSearchCriteria;
  searchExecuted: boolean;
}
