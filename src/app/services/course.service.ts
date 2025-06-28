import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout, catchError, throwError } from 'rxjs';
export interface Course{
  id:number,
  name:string,
  description:string,
  duration: string,
  level:string,
  price:number
}
@Injectable({
  providedIn: 'root'
})
export class CourseService {
private http: HttpClient = inject (HttpClient)
  //private baseUrl:string="http://localhost:8084/course"
  private baseUrl:string="/api/course"

  getCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.baseUrl)
    .pipe(
      timeout(3000),
      catchError(err=>{
        console.log(err);
        throw new Error("error items")
      })
    )
  }
  insertCourse(course:Course):Observable<void>{
    return this.http.post<void>(this.baseUrl, course)
           .pipe(
             timeout(3000),
             catchError(err=>{
               console.log(" error insert ", err);
               return throwError(()=> new Error(" error al insertar "))
             })
           );
 }

 updateCourse(course:Course):Observable<void>{
  return this.http.put<void>(this.baseUrl, course)
         .pipe(
           timeout(3000),
           catchError(err=>{
             console.log(" error actualizar ", err);
             return throwError(()=> new Error(" error al actualizar "))
           })
         );
}


 /*delete dog from api */
 deleteCourse(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
    .pipe(
     timeout(3000),
     catchError(err=>{
       console.log(" error delete ", err);
       return throwError(()=> new Error(" error al eliminar "))
     })
    );
 }
  constructor() { }
}
