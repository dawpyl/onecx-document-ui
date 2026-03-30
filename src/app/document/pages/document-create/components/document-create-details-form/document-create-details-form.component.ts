import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentCreateDetailsStepData } from '../../../../types/document-create.types';

@Component({
  selector: 'app-document-create-details-form',
  templateUrl: './document-create-details-form.component.html',
  styleUrls: ['./document-create-details-form.component.scss'],
})
export class DocumentCreateDetailsFormComponent {
  @Input() details: Partial<DocumentCreateDetailsStepData> | null = null;

  @Output() next = new EventEmitter<Partial<DocumentCreateDetailsStepData>>();

  onNextClick(): void {
    this.next.emit(this.details ?? {});
  }
}
