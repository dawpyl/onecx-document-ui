import {
  DataTableColumn,
  DiagramComponentState,
  InteractiveDataViewComponentState,
  RowListGridData,
  SearchHeaderComponentState,
} from '@onecx/portal-integration-angular';
import { DocumentSearchCriteria } from './document-search.parameters';

export interface DocumentSearchViewModel {
  columns: DataTableColumn[];
  searchCriteria: DocumentSearchCriteria;
  results: RowListGridData[];
  resultComponentState: InteractiveDataViewComponentState | null;
  searchHeaderComponentState: SearchHeaderComponentState | null;
  diagramComponentState: DiagramComponentState | null;
  chartVisible: boolean;
  searchLoadingIndicator: boolean;
  searchExecuted: boolean;
}
