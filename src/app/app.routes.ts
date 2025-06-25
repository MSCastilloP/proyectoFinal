import { Routes } from '@angular/router';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'courses', component:CoursesPageComponent},
    {path:'admingPage', component:AdminPageComponent},
];
