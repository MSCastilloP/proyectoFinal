import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatGridListModule, MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images:string[]=[
    "https://static.vecteezy.com/system/resources/previews/022/100/214/original/java-logo-transparent-free-png.png",
    "https://d585tldpucybw.cloudfront.net/sfimages/default-source/blogs/2023/2023-11/angular-logo-1200-628.png?sfvrsn=bf64b1ee_3"
 
  ]

  currentIndex=signal<number>(0);
  interval!:any;

  ngOnInit(){
    this.interval=setInterval(()=>{
      this.currentIndex.update(value => (value+1)%this.images.length)
    },4000)
  }

  ngOnDestroy(){
    clearInterval(this.interval)
  }
}
