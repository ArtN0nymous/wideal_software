import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor (private domSanitizer:DomSanitizer){

  }
  transform(image:string): any {
    return this.domSanitizer.bypassSecurityTrustStyle(image);
  }

}
