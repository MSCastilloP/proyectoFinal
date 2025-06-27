import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-course-dialog',
  imports: [MatFormField,MatLabel,MatSelect,MatOption,ReactiveFormsModule],
  templateUrl: './add-course-dialog.component.html',
  styleUrl: './add-course-dialog.component.css'
})
export class AddCourseDialogComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      duration: [data?.duration || '', Validators.required],
      level: [data?.level || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]]
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
