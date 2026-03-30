import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttachmentData } from '../../../../types/document-create.types';

@Component({
  selector: 'app-document-create-attachments',
  templateUrl: './document-create-attachments.component.html',
  styleUrls: ['./document-create-attachments.component.scss'],
})
export class DocumentCreateAttachmentsComponent {
  @Input() attachments: AttachmentData[] = [];

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<AttachmentData[]>();

  onBackClick(): void {
    this.back.emit();
  }

  onNextClick(): void {
    this.next.emit(this.attachments);
  }
}
