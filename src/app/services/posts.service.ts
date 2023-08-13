import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponsePost, Post } from '../interfaces/interfaces';
import { DataLocalService } from './data-local.service';
import { UsuariosService } from './usuarios.service';
import {FileTransfer,FileUploadOptions,FileTransferObject} from '@awesome-cordova-plugins/file-transfer/ngx'
const URL = '';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagina = 0;
  token:string = '';
  newPOst = new EventEmitter<Post>();
  constructor(private http:HttpClient,private usuarioService:UsuariosService, private fileTransfer:FileTransfer) {
    usuarioService.loadUser().then((res)=>{
      this.token = usuarioService.token||'';
    });
  }
  private executeQuery<T>( endpoint: string,params:any,headers:any) {
    return this.http.get<T>(`${ URL }${ endpoint }`, {
      params,
      headers,
    });
   }
  getPost(pull:boolean=false){
    if(pull!==false){
      this.pagina=0;
    }
    this.pagina ++;
    return this.executeQuery<ResponsePost>('/posts',{pagina:this.pagina},{'x-token':this.usuarioService.token});
  }
  post(post:any){
    const headers = new HttpHeaders({
      'x-token':this.token,
    });
    return new Promise((resolve)=>{
      this.http.post(URL+'/posts/',post,{headers}).subscribe((res:any)=>{
        this.newPOst.emit(res.result);
        if(res.ok){
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
    
  }

  subirImg(img:string){
    const options:FileUploadOptions={
      fileKey:'image',
      headers:{
        'x-token':this.usuarioService.token,
      },
    };
    const fileTransfer:FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img,URL+'/posts/upload',options)
    .then((result)=>{
      console.log('result',result);
      alert(result);
    }).catch((err)=>{
      console.log('err',err);
      alert(err);
    });
  }
}
