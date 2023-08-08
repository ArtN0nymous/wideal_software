import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    DomSanitizerPipe,
    ImageSanitizerPipe,
  ],
  exports:[ImagenPipe,ParesPipe,DomSanitizerPipe,ImageSanitizerPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
