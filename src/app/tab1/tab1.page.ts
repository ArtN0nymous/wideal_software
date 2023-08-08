import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ResponsePost, Post } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  posts: Post[]=[];
  habilitado = true;
  constructor(private postsService:PostsService) {}
  ngOnInit(): void {
      this.siguiente();
      this.postsService.newPOst.subscribe((post)=>{
        this.posts.unshift(post);
      });
  }
  recargar(event:any){
    this.siguiente(event,true);
    this.habilitado=true;
    this.posts=[];
  }
  siguiente(event?:any,pull:boolean=false){
    this.postsService.getPost(pull).subscribe((res:ResponsePost)=>{
      console.log(res);
      this.posts.push(...res.result);
      if(event){
        event.target.complete();
        if(res.result.length<1 && pull==false){
          this.habilitado=false;
        }
      }
    });
  }
}
