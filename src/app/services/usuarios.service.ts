import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { User, UserResponse} from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { DataLocalService } from './data-local.service';
import { UserCredential } from 'firebase/auth';
const URL = '';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  token = null;
  private FireUser:UserResponse={
    uid : '',
    email : '',
    emailVerified : false,
    isAnonymous : false,
    providerData:[{
      providerId : '',
      uid : '',
      displayName : null,
      email : '',
      phoneNumber : null,
      photoURL : null,
    }],
    stsTokenManager : {
      refreshToken : '',
      accessToken : '',
      expirationTime : 0,
    },
    createdAt : '',
    lastLoginAt : '',
    apiKey : '',
    appName : ''
  }
  user:User={
    providerId : '',
    uid : '',
    displayName : null,
    email : '',
    phoneNumber : null,
    photoURL : null,
    avatar : ''
  }
  _storage:Storage|null=null;
  constructor(private http:HttpClient,private storage:Storage,private navCtrl:NavController) {
    this.init();
  }
  logout(){
    this.storage.clear();
    this.navCtrl.navigateRoot('/login',{animated:true});
  }
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
  async saveUser(user:UserCredential){
    await this.storage.set('user', JSON.stringify(user));
  }

  async loadUser(){
    const res = await this.storage.get('user')||null;
    if(res){
      this.FireUser =  JSON.parse(res).user;
    }
  }

  async validaUser():Promise<boolean>{
    await this.loadUser();
    console.log(this.FireUser);
    if(!this.FireUser.uid){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }else{
      return Promise.resolve(true);
    }
  }

  getUsuario(){
    if(!this.FireUser.uid){
      this.validaUser();
    }
    this.user =  this.FireUser.providerData[0];
    return {...this.user};
  }
}
