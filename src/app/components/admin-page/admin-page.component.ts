import { Component, inject, signal } from '@angular/core';
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
  imports: [MatDialogModule, MatButton,MatTableModule, MatIconModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  private service = inject(CourseService)

  courses = signal<Course[]>([]);
  
  constructor(private dialog: MatDialog) {}

  openAddCourseDialog(course:any) {
    const dialogRef =  this.dialog.open(AddCourseDialogComponent, {
      width: '400px',
      data: course
    });
     dialogRef.afterClosed().subscribe(result => {
    if (result) {
  
      // 🔁 Volver a cargar los cursos
      this.getCourses(); // <-- aquí actualizas la tabla
    }
  });
  }

  closeAddCourseDialog(course:any) {
    this.dialog.afterAllClosed.subscribe(
      {
        complete:()=>
        this.getCourses()
      }
    );
  }

  ngOnInit(){
    this.getCourses()
  }

  getCourses(){
this.service.getCourses().subscribe({
      next: values=>{this.courses.set(values)},
      error: err=>{console.log(err)}
    });
  }

  editCourse(course: any) {
   this.openAddCourseDialog(course);
    // lógica de edición (puedes abrir un modal con datos existentes)
  }

  deleteCourse(id: number) {
    console.log("entra")
     this.service.deleteCourse(id).subscribe(
      {
        next: res=>{

        },error: err=>{

        },complete:()=>{
          this.ngOnInit()
        }
      }
     );
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
