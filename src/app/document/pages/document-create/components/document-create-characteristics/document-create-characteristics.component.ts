import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentCharacteristicFormValue } from '../../../../types/document-create.types';

@Component({
  selector: 'app-document-create-characteristics',
  templateUrl: './document-create-characteristics.component.html',
  styleUrls: ['./document-create-characteristics.component.scss'],
})
export class DocumentCreateCharacteristicsComponent {
  @Input() characteristics: DocumentCharacteristicFormValue[] = [];

  @Output() back = new EventEmitter<void>();
  @Output() save = new EventEmitter<DocumentCharacteristicFormValue[]>();

  onBackClick(): void {
    this.back.emit();
  }

  onSaveClick(): void {
    this.save.emit(this.characteristics);
  }
}
