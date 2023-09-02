import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ResponsePost, Post, User } from '../interfaces/interfaces';
import { FirebaseService } from '../services/firebase.service';
import { UsuariosService } from '../services/usuarios.service';
import { ModalController } from '@ionic/angular';
import { NewpostComponent } from '../componentes/newpost/newpost.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  posts: Post[]=[];
  habilitado = true;
  user: User = {
    providerId : '',
    uid : '',
    displayName : null,
    email : '',
    phoneNumber : null,
    photoURL : null,
    avatar : ''
  };
  constructor(private postsService:PostsService, private fire:FirebaseService, private userService: UsuariosService, private modalCtrl: ModalController) {}
  ngOnInit(): void {
      //this.siguiente();
      this.loadPosts();
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
  loadPosts(){
    let user = this.userService.getUsuario();
    this.fire.getPost(user.uid).then((res:any)=>{
      console.log(res);
      this.posts.push(res);
    });
  }
  async newPost(){
    const modal = await this.modalCtrl.create({
      component: NewpostComponent,
      componentProps:{
        user: this.user.uid,
      }
    });
    modal.present();

    const { data, role } = await modal.onDidDismiss();
  }
}
