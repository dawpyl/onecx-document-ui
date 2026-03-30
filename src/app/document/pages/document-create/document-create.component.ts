import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreadcrumbService } from '@onecx/portal-integration-angular';
import { Observable } from 'rxjs';
import { DocumentCreateStep } from '../../types/document-create-step.enum';
import { DocumentCreateActions } from './document-create.actions';
import { DocumentCreateViewModel } from './document-create.viewmodel';
import { selectDocumentCreateViewModel } from './document-create.selectors';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss'],
})
export class DocumentCreateComponent implements OnInit {
  readonly steps = DocumentCreateStep;
  viewModel$: Observable<DocumentCreateViewModel>;

  constructor(
    private readonly store: Store,
    private readonly breadcrumbService: BreadcrumbService
  ) {
    this.viewModel$ = this.store.select(selectDocumentCreateViewModel);
  }

  ngOnInit(): void {
    this.breadcrumbService.setItems([
      {
        labelKey: 'DOCUMENT_SEARCH.HEADER',
        titleKey: 'DOCUMENT_SEARCH.HEADER',
        routerLink: '../',
      },
      {
        labelKey: 'DOCUMENT_CREATE.BREADCRUMB',
        titleKey: 'DOCUMENT_CREATE.BREADCRUMB',
      },
    ]);
  }

  onBackClick(vm: DocumentCreateViewModel): void {
    this.store.dispatch(
      DocumentCreateActions.goToPreviousStep({
        currentStep: vm.activeStep,
      })
    );
  }

  onNextClick(vm: DocumentCreateViewModel): void {
    this.store.dispatch(
      DocumentCreateActions.goToNextStep({
        currentStep: vm.activeStep,
      })
    );
  }

  onSubmitClick(): void {
    this.store.dispatch(DocumentCreateActions.submitClicked());
  }
}
