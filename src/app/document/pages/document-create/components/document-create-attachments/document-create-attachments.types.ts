import { FormControl, FormGroup } from '@angular/forms';

export type AttachmentFormGroup = FormGroup<{
  name: FormControl<string | null>;
  mimeTypeId: FormControl<string | null>;
  mimeTypeName: FormControl<string | null>;
  validForEnd: FormControl<string | null>;
  description: FormControl<string | null>;
}>;
