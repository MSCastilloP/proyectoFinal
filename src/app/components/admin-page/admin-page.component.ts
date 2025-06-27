import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Course, CourseService } from '../../services/course.service';
import { AddCourseDialogComponent } from '../add-course-dialog/add-course-dialog.component';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-admin-page',
  imports: [MatDialogModule, MatButton,MatTable, MatIcon],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  private service = inject(CourseService)

   courses=toSignal(this.service
   .getCourses()
   .pipe(catchError(err=>{
     console.log(err);
     return of([])
   })),
   {initialValue : [] as Course[]});



   
displayedColumns: string[] = ['id', 'name', 'description', 'duration', 'level', 'price', 'actions'];

  constructor(private dialog: MatDialog) {}

  openAddCourseDialog(course:any) {
    this.dialog.open(AddCourseDialogComponent, {
      width: '400px',
      data: course
    });
  }

  editCourse(course: any) {
   this.openAddCourseDialog(course);
    // lógica de edición (puedes abrir un modal con datos existentes)
  }

  deleteCourse(id: number) {
    console.log("entra")
     this.service.deleteCourse(id).subscribe(res=>{
      console.log(res),
      this.service.getCourses
    
    });
  }
  getLevelClass(level: string): string {
  switch (level.toLowerCase()) {
    case 'básico': return 'level-basic';
    case 'intermedio': return 'level-intermediate';
    case 'experto': return 'level-expert';
    default: return '';
  }
}
}
