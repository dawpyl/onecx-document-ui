import { Routes } from '@angular/router';
import { DocumentSearchComponent } from './pages/document-search/document-search.component';

export const routes: Routes = [
  { path: '', component: DocumentSearchComponent, pathMatch: 'full' },
];
