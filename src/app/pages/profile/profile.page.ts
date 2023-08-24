import { Component, OnInit, Input } from '@angular/core';
import { Post, UserProfile } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { PostsComponent } from 'src/app/componentes/posts/posts.component';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private modalCtrl:ModalController, private fire:FirebaseService) { }
  @Input() user!:UserProfile;
  url :string|null='';
  portada:string='' ;
  portada_color:string = '';
  posts:Post[]=[] 
  ngOnInit() {
    this.url = this.user?.url_portada||null;
    this.portada = `background-image: url('${this.url}');`;
    this.portada_color = `background-color: ${this.user?.color_portada};`;
    
    
  }
  close(){
    this.modalCtrl.dismiss();
  }

}
