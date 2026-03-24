import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Action,
  BreadcrumbService,
  buildSearchCriteria,
  DataSortDirection,
  DataTableColumn,
  DiagramComponentState,
  DiagramType,
  ExportDataService,
  InteractiveDataViewComponentState,
  SearchHeaderComponentState,
} from '@onecx/portal-integration-angular';
import { PrimeIcons } from 'primeng/api';
import { Calendar } from 'primeng/calendar';
import { map, Observable } from 'rxjs';
import { DocumentSearchActions } from './document-search.actions';
import {
  DocumentSearchCriteriaSchema,
  documentSearchCriteriasSchema,
} from './document-search.parameters';
import { selectDocumentSearchViewModel } from './document-search.selectors';
import { DocumentSearchViewModel } from './document-search.viewmodel';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss'],
})
export class DocumentSearchComponent implements OnInit {
  @ViewChildren(Calendar) calendars!: QueryList<Calendar>;
  viewModel$: Observable<DocumentSearchViewModel> = this.store.select(
    selectDocumentSearchViewModel
  );

  defaultDataSortDirection = DataSortDirection.NONE;
  defaultDiagramType = DiagramType.PIE;

  // ACTION S10: Update header actions: https://onecx.github.io/docs/documentation/current/onecx-nx-plugins:generator/search/update-header-actions.html#action-10
  headerActions$: Observable<Action[]> = this.viewModel$.pipe(
    map((vm) => {
      const actions: Action[] = [
        {
          labelKey: 'DOCUMENT_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          icon: PrimeIcons.DOWNLOAD,
          titleKey: 'DOCUMENT_SEARCH.HEADER_ACTIONS.EXPORT_ALL',
          show: 'asOverflow',
          actionCallback: () => this.exportItems(),
        },
        {
          labelKey: vm.chartVisible
            ? 'DOCUMENT_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'DOCUMENT_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          icon: PrimeIcons.EYE,
          titleKey: vm.chartVisible
            ? 'DOCUMENT_SEARCH.HEADER_ACTIONS.HIDE_CHART'
            : 'DOCUMENT_SEARCH.HEADER_ACTIONS.SHOW_CHART',
          show: 'asOverflow',
          actionCallback: () => this.toggleChartVisibility(),
        },
      ];
      return actions;
    })
  );

  // ACTION S9: Select the column to be displayed in the diagram: https://onecx.github.io/docs/documentation/current/onecx-nx-plugins:generator/search/configure-result-diagram.html#action-3
  diagramColumnId = 'id';
  diagramColumn$ = this.viewModel$.pipe(
    map(
      (vm) =>
        vm.columns.find((e) => e.id === this.diagramColumnId) as DataTableColumn
    )
  );

  public documentSearchFormGroup: FormGroup = this.formBuilder.group({
    ...(Object.fromEntries(
      documentSearchCriteriasSchema.keyof().options.map((k) => [k, null])
    ) as Record<keyof DocumentSearchCriteriaSchema, unknown>),
  } satisfies Record<keyof DocumentSearchCriteriaSchema, unknown>);

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public readonly locale: string,
    private readonly exportDataService: ExportDataService
  ) {}

  ngOnInit() {
    this.breadcrumbService.setItems([
      {
        titleKey: 'DOCUMENT_SEARCH.BREADCRUMB',
        labelKey: 'DOCUMENT_SEARCH.BREADCRUMB',
        routerLink: '/document',
      },
    ]);
    this.viewModel$.subscribe((vm) => {
      console.log(vm)
      this.documentSearchFormGroup.patchValue(vm.searchCriteria)
    }
    );
  }

  resultComponentStateChanged(state: InteractiveDataViewComponentState) {
    this.store.dispatch(
      DocumentSearchActions.resultComponentStateChanged(state)
    );
  }

  searchHeaderComponentStateChanged(state: SearchHeaderComponentState) {
    this.store.dispatch(
      DocumentSearchActions.searchHeaderComponentStateChanged(state)
    );
  }

  diagramComponentStateChanged(state: DiagramComponentState) {
    this.store.dispatch(
      DocumentSearchActions.diagramComponentStateChanged(state)
    );
  }

  search(formValue: FormGroup) {
    const searchCriteria = buildSearchCriteria(
      formValue.getRawValue(),
      this.calendars,
      { removeNullValues: true }
    );
    this.store.dispatch(
      DocumentSearchActions.searchButtonClicked({ searchCriteria })
    );
  }

  resetSearch() {
    this.store.dispatch(DocumentSearchActions.resetButtonClicked());
  }

  exportItems() {
    this.store.dispatch(DocumentSearchActions.exportButtonClicked());
  }

  toggleChartVisibility() {
    this.store.dispatch(DocumentSearchActions.chartVisibilityToggled());
  }
}
