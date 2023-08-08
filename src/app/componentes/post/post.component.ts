import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  @Input() post:Post ={};
  constructor() { }
  imgs = [];
  img1='/assets/perro-1.jpg';
  img2='/assets/perro-2.jpg';
  img3='/assets/perro-3.jpg';
  ngOnInit() {}

  soloOpts= {
    allowSlideNext:false,
    allowSlidePrev:false,
  };

}
