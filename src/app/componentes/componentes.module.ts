import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  entryComponents:[PostComponent,PostsComponent,AvatarSelectorComponent,MapaComponent],
  declarations: [PostComponent,PostsComponent,AvatarSelectorComponent,MapaComponent],
  exports:[PostsComponent,AvatarSelectorComponent,MapaComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ]
})
export class ComponentesModule { }
