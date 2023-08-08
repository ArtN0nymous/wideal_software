import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post, ResponsePost } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  posts: Post[]=[];
  constructor(private postsService:PostsService) {}
  ngOnInit(): void {
      this.postsService.getPost().subscribe((res:ResponsePost)=>{
        console.log(res);
        this.posts.push(...res.result);
      });
  }
}
