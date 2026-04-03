import { RetryFileUploadDialogComponent } from './retry-file-upload-dialog.component';

describe('RetryFileUploadDialogComponent', () => {
  let component: RetryFileUploadDialogComponent;

  beforeEach(() => {
    component = new RetryFileUploadDialogComponent();
  });

  it('should create the component with dialogResult set to null', () => {
    expect(component).toBeTruthy();
    expect(component.dialogResult).toBeNull();
  });

  describe('onFileSelected', () => {
    it('should set dialogResult to the provided file when onFileSelected is called', () => {
      const mockFile = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });

      component.onFileSelected(mockFile);

      expect(component.dialogResult).toBe(mockFile);
    });
  });
});
