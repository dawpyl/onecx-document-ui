import { createSelector } from '@ngrx/store';
import { createChildSelectors } from '@onecx/ngrx-accelerator';
import { RowListGridData } from '@onecx/portal-integration-angular';
import { Document } from '../../../shared/generated';
import { documentFeature } from '../../document.reducers';
import { initialState } from './document-search.reducers';
import { DocumentSearchViewModel } from './document-search.viewmodel';

export const documentSearchSelectors = createChildSelectors(
  documentFeature.selectSearch,
  initialState
);

export const selectResults = createSelector(
  documentSearchSelectors.selectResults,
  (results: Document[]): RowListGridData[] => {
    return results.map((item) => ({
      imagePath: '',
      ...item,
      // ACTION S7: Create a mapping of the items and their corresponding translation keys
      // https://onecx.github.io/docs/documentation/current/onecx-nx-plugins:generator/search/search-results.html#action-7
    }));
  }
);

export const selectDocumentSearchViewModel = createSelector(
  documentSearchSelectors.selectColumns,
  documentSearchSelectors.selectCriteria,
  selectResults,
  documentSearchSelectors.selectResultComponentState,
  documentSearchSelectors.selectSearchHeaderComponentState,
  documentSearchSelectors.selectDiagramComponentState,
  documentSearchSelectors.selectChartVisible,
  documentSearchSelectors.selectSearchLoadingIndicator,
  documentSearchSelectors.selectSearchExecuted,
  (
    columns,
    searchCriteria,
    results,
    resultComponentState,
    searchHeaderComponentState,
    diagramComponentState,
    chartVisible,
    searchLoadingIndicator,
    searchExecuted
  ): DocumentSearchViewModel => ({
    columns,
    searchCriteria,
    results,
    resultComponentState,
    searchHeaderComponentState,
    diagramComponentState,
    chartVisible,
    searchLoadingIndicator,
    searchExecuted,
  })
);
