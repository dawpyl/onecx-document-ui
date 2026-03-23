import { combineReducers, createFeature } from '@ngrx/store';
import { DocumentState } from './document.state';
import { documentSearchReducer } from './pages/document-search/document-search.reducers';

export const documentFeature = createFeature({
  name: 'document',
  reducer: combineReducers<DocumentState>({
    search: documentSearchReducer,
  }),
});
