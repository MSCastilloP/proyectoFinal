import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogContent ,MatDialogTitle} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course-dialog',
  imports: [MatFormField,MatLabel,MatSelect,MatOption,ReactiveFormsModule, MatInputModule ,MatButtonModule, MatDialogContent,MatDialogTitle],
  templateUrl: './add-course-dialog.component.html',
  styleUrl: './add-course-dialog.component.css'
})
export class AddCourseDialogComponent {
  private service = inject(CourseService)
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseForm = this.fb.group({
      id: [data?.id],
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      duration: [data?.duration || '', Validators.required],
      level: [data?.level || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]]
    });
  }

  onSave(): void {
    console.log(this.courseForm.value)
    if (this.courseForm.valid) {
      if(this.courseForm.value.id!=null){
this.service.updateCourse(this.courseForm.value).subscribe();

      }else{
this.service.insertCourse(this.courseForm.value).subscribe();
      }

      
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
