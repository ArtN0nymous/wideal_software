import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { DataLocalService } from './data-local.service';
const URL = '';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token = null;
  private usuario:User={};
  _storage:Storage|null=null;
  constructor(private http:HttpClient,private storage:Storage,private navCtrl:NavController) {
    this.init();
  }
  login(user:string,pass:string){
    return new Promise(resolve=>{
      this.http.post(URL+'/user/login',{email:user,password:pass}).subscribe((res:any)=>{
        if(res.ok){
          this.token=res.token;
          this.saveUser(res.token);
          resolve(true);
        }else{
          this.token=null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
    
  }

  logout(){
    this.token=null;
    this.usuario={};
    this.storage.clear();
    this.navCtrl.navigateRoot('/login',{animated:true});
  }

  register(usuario:User){
    return new Promise(resolve=>{
      this.http.post(URL+'/user/register',usuario).subscribe((res:any)=>{
        if(res.ok){
          this.token=res.token;
          this.saveUser(res.token);
          resolve(true);
        }else{
          this.token=null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
    
  }
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
  async saveUser(token:string){
    await this.storage.set('token',token);
    //validamos para hacer consulta y traer la información del usuario a partir del token ya que no carga su info de perfil
    // en algunas ocaciones.
    this.validaToken();
  }

  async loadToken(){
    this.token= await this.storage.get('token')||null;
  }

  async validaToken():Promise<boolean>{
    await this.loadToken();
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve=>{
      const headers = new HttpHeaders({
        'x-token':this.token?this.token:'',
      });
      this.http.get(URL+'/user/',{headers}).subscribe((res:any)=>{
        if(res.ok){
          this.usuario=res.result;
          resolve(true);
        }else{
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  getUsuario(){
    if(!this.usuario._id){
      this.validaToken();
    }
    return {...this.usuario};
  }

  actualizarUsuario(usuario:User){
    const headers=new HttpHeaders({
      'x-token':this.token||''
    });
    return new Promise((resolve)=>{
      this.http.post(URL+'/user/update',usuario,{headers}).subscribe((res:any)=>{
        if(res.ok){
          this.saveUser(res.token);
          resolve(true);
        }else{
          resolve(false);;
        }
      });
    });
    
  }
}
