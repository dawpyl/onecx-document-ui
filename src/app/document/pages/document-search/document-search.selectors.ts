import { createSelector } from '@ngrx/store';
import { createChildSelectors } from '@onecx/ngrx-accelerator';
import { RowListGridData } from '@onecx/portal-integration-angular';
import { Channel, DocumentDetail, DocumentType } from '../../../shared/generated';
import { documentFeature } from '../../document.reducers';
import { initialState } from './document-search.reducers';
import { DocumentSearchViewModel } from './document-search.viewmodel';
import { SelectItem } from 'primeng/api';

export const documentSearchSelectors = createChildSelectors(
  documentFeature.selectSearch,
  initialState
);

export const selectResults = createSelector(
  documentSearchSelectors.selectResults,
  (results: DocumentDetail[]): RowListGridData[] => {
    console.log(results)
    return results.map((item) => ({
      imagePath: '',
      ...item,
      id: item.id!,
      typeName: item.type?.name
    }));
  }
);

const selectDocumentTypes = createSelector(
  documentSearchSelectors.selectAvailableDocumentTypes,
  (docTypes: DocumentType[]): SelectItem[] => {
    return docTypes.map(type => ({label: type.name, value: type.id}))
  }
);

const selectChannels = createSelector(
  documentSearchSelectors.selectAvailableChannels,
  (channels: Channel[]): SelectItem[] => {
    return channels.map(channel => ({label: channel.name, value: channel.id}))
  }
)

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
  documentSearchSelectors.selectCriteriaOptionsLoaded,
  selectDocumentTypes,
  selectChannels,
  (
    columns,
    searchCriteria,
    results,
    resultComponentState,
    searchHeaderComponentState,
    diagramComponentState,
    chartVisible,
    searchLoadingIndicator,
    searchExecuted,
    criteriaOptionsLoaded,
    availableDocumentTypes,
    avilableChannels,
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
    criteriaOptionsLoaded,
    availableDocumentTypes,
    avilableChannels,
  })
);
