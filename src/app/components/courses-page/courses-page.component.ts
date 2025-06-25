import { Component, inject, signal } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';


import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  imports: [RouterLink],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {
  private service = inject(CourseService)

 
  items=toSignal(this.service
   .getCourses()
   .pipe(catchError(err=>{
     console.log(err);
     return of([])
   })),
   {initialValue : [] as Course[]});
 

}
