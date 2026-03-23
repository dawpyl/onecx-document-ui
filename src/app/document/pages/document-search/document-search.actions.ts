import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  GroupByCountDiagramComponentState,
  InteractiveDataViewComponentState,
  SearchHeaderComponentState,
} from '@onecx/portal-integration-angular';
import { Document } from '../../../shared/generated';
import { DocumentSearchCriteria } from './document-search.parameters';

export const DocumentSearchActions = createActionGroup({
  source: 'DocumentSearch',
  events: {
    'Search button clicked': props<{
      searchCriteria: DocumentSearchCriteria;
    }>(),
    'Reset button clicked': emptyProps(),
    'document search results received': props<{
      stream: Document[];
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    }>(),
    'document search results loading failed': props<{ error: string | null }>(),
    'Export button clicked': emptyProps(),
    'Result component state changed':
      props<InteractiveDataViewComponentState>(),
    'Search header component state changed':
      props<SearchHeaderComponentState>(),
    'Diagram component state changed':
      props<GroupByCountDiagramComponentState>(),
    'Chart visibility toggled': emptyProps(),
  },
});
