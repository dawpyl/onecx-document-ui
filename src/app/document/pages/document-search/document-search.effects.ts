import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import {
  filterForNavigatedTo,
  filterOutQueryParamsHaveNotChanged,
} from '@onecx/ngrx-accelerator';
import {
  ExportDataService,
  PortalMessageService,
} from '@onecx/portal-integration-angular';
import equal from 'fast-deep-equal';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { DocumentBffService } from '../../../shared/generated';
import { DocumentSearchActions } from './document-search.actions';
import { DocumentSearchComponent } from './document-search.component';
import { documentSearchCriteriasSchema } from './document-search.parameters';
import {
  documentSearchSelectors,
  selectDocumentSearchViewModel,
} from './document-search.selectors';

@Injectable()
export class DocumentSearchEffects {
  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private documentService: DocumentBffService,
    private router: Router,
    private store: Store,
    private messageService: PortalMessageService,
    private readonly exportDataService: ExportDataService
  ) {}

  syncParamsToUrl$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          DocumentSearchActions.searchButtonClicked,
          DocumentSearchActions.resetButtonClicked
        ),
        concatLatestFrom(() => [
          this.store.select(documentSearchSelectors.selectCriteria),
          this.route.queryParams,
        ]),
        tap(([, criteria, queryParams]) => {
          const results = documentSearchCriteriasSchema.safeParse(queryParams);
          if (!results.success || !equal(criteria, results.data)) {
            const params = {
              ...criteria,
              //TODO: Move to docs to explain how to only put the date part in the URL in case you have date and not datetime
              //exampleDate: criteria.exampleDate?.toISOString()?.slice(0, 10)
            };
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: params,
              replaceUrl: true,
              onSameUrlNavigation: 'ignore',
            });
          }
        })
      );
    },
    { dispatch: false }
  );

  searchByUrl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, DocumentSearchComponent),
      filterOutQueryParamsHaveNotChanged(
        this.router,
        documentSearchCriteriasSchema,
        false
      ),
      concatLatestFrom(() =>
        this.store.select(documentSearchSelectors.selectCriteria)
      ),
      switchMap(([, searchCriteria]) => this.performSearch(searchCriteria))
    );
  });

  performSearch(searchCriteria: Record<string, any>) {
    return this.documentService
      .searchDocuments({
        ...Object.entries(searchCriteria).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value instanceof Date ? value.toISOString() : value,
          }),
          {}
        ),
      })
      .pipe(
        map(({ stream, size, number, totalElements, totalPages }) =>
          DocumentSearchActions.documentSearchResultsReceived({
            stream,
            size,
            number,
            totalElements,
            totalPages,
          })
        ),
        catchError((error) =>
          of(
            DocumentSearchActions.documentSearchResultsLoadingFailed({
              error,
            })
          )
        )
      );
  }

  exportData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DocumentSearchActions.exportButtonClicked),
        concatLatestFrom(() =>
          this.store.select(selectDocumentSearchViewModel)
        ),
        map(([, viewModel]) => {
          this.exportDataService.exportCsv(
            viewModel.resultComponentState?.displayedColumns ?? [],
            viewModel.results,
            'Document.csv'
          );
        })
      );
    },
    { dispatch: false }
  );

  errorMessages: { action: Action; key: string }[] = [
    {
      action: DocumentSearchActions.documentSearchResultsLoadingFailed,
      key: 'DOCUMENT_SEARCH.ERROR_MESSAGES.SEARCH_RESULTS_LOADING_FAILED',
    },
  ];

  displayError$ = createEffect(
    () => {
      return this.actions$.pipe(
        tap((action) => {
          const e = this.errorMessages.find(
            (e) => e.action.type === action.type
          );
          if (e) {
            this.messageService.error({ summaryKey: e.key });
          }
        })
      );
    },
    { dispatch: false }
  );
}
