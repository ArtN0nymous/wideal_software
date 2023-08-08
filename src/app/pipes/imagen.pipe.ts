import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
const URL = environment.url;
@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {

  transform(img: string, userId:string|undefined): string {
    if(userId === undefined){
      console.log('Este post no tiene un usuario valido.');
    }
    const url_img= `${URL}/posts/imagen//${userId}/${img}`;
    return url_img;
  }

}
