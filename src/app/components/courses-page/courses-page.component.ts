import { Component, inject, signal } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';


import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-courses-page',
  imports: [RouterLink,MatCard, MatCardHeader, MatCardTitle , MatCardSubtitle,MatCardContent],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {
  private service = inject(CourseService)

 
  courses=toSignal(this.service
   .getCourses()
   .pipe(catchError(err=>{
     console.log(err);
     return of([])
   })),
   {initialValue : [] as Course[]});
 
   getLevelStyle(level: string) {
    switch(level.toLowerCase()) {
      case 'básico': return { color: 'green' };
      case 'intermedio': return { color: 'orange' };
      case 'experto': return { color: 'red' };
      default: return {};
    }
  }

}
