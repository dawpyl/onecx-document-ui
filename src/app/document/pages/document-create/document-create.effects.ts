import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { filterForNavigatedTo } from '@onecx/ngrx-accelerator';
import { PortalMessageService } from '@onecx/portal-integration-angular';
import { map, tap } from 'rxjs';
import { DocumentCreateComponent } from './document-create.component';
import { DocumentCreateActions } from './document-create.actions';

@Injectable()
export class DocumentCreateEffects {
  constructor(
    private actions$: Actions,
    private readonly router: Router,
    private readonly messageService: PortalMessageService
  ) {}

  navigatedToCreatePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filterForNavigatedTo(this.router, DocumentCreateComponent),
      map(() => DocumentCreateActions.enteredPage())
    );
  });

  attachmentMimeTypeNotSupported$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DocumentCreateActions.attachmentMimeTypeNotSupported),
        tap(() => {
          this.messageService.error({
            summaryKey:
              'DOCUMENT_CREATE.ATTACHMENTS.ERROR_MESSAGES.MIME_TYPE_NOT_SUPPORTED',
          });
        })
      );
    },
    { dispatch: false }
  );
}
