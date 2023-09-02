import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';
import { NewpostComponent } from './newpost/newpost.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  entryComponents:[PostComponent,PostsComponent,AvatarSelectorComponent,MapaComponent, NewpostComponent],
  declarations: [PostComponent,PostsComponent,AvatarSelectorComponent,MapaComponent, NewpostComponent],
  exports:[PostsComponent,AvatarSelectorComponent,MapaComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
  ]
})
export class ComponentesModule { }
