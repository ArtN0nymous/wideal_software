import { Injectable } from '@angular/core';
import { Firestore,collection,collectionData,addDoc,setDoc, getDocs,query,where } from '@angular/fire/firestore';
import { uploadBytes, ref, getStorage } from '@angular/fire/storage';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User as FireUser} from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { UsuariosService } from './usuarios.service';
import { User, UserProfile, Post } from '../interfaces/interfaces';
import { DataLocalService } from './data-local.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user:User={
    displayName : '',
    email : '',
    phoneNumber : '',
    photoURL : '',
    providerId : '',
    uid : ''
  }
  constructor( private firestore: Firestore, private auth: Auth,private userService: UsuariosService ,private dataLocal:DataLocalService,private navCtrl:NavController) {}
  userRef = collection(this.firestore,'users');
  getNotes(){
    const colRef = collection(this.firestore,'notes');
    return collectionData(colRef);
  }
  async login(email:string,pass:string){
    try{
      const result = await signInWithEmailAndPassword(this.auth,email,pass);
      await this.userService.saveUser(result);
      return true;
    }catch(error){
      throw error;
    }
    
  }
  async register(email: string, pass: string, displayName: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, pass);
      await this.userService.saveUser(result);
      this.user = result.user.providerData[0];
      //**NORMALIZAMOS EL NOMBRE A MINUSCULA PARA DESPUES PODER APLICAR BUSQUEDAS DE USUARIOS CON EL NOMBRE */
      this.user.displayName = displayName.toLowerCase();
      this.user.avatar = 'av-1.png';
      var color = this.dataLocal.randomHexColor();
      await addDoc(this.userRef,{
        chats: '',
        color_portada: color,
        descripcion: '',
        displayName,
        email,
        following:'',
        followme:'',
        fiends:'',
        solicitudes:'',
        url_photo:'',
        url_portada:'',
        avatar: this.user.avatar,
        uid: this.user.uid
      });
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateProfile(user:FireUser,displayName:string,photoURL:string){
    return await updateProfile(user,{displayName,photoURL});
  }
  async searchUser(name:string){
    const colRef = collection(this.firestore,'users');
    const q = query(colRef,where('displayName', '>=', name.toLowerCase()), where('displayName', '<=', name.toLowerCase() + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    let users:UserProfile[]  = [];
    querySnapshot.forEach((doc)=>{
      users.push(doc.data());
    });
    console.log(users);
    return users;
  }

  async getPost(user:string){
    const colRef = collection(this.firestore,'posts');
    const q = query(colRef,where('uid','==',user));
    const querySnapshot = await getDocs(q);
    let posts:Post[]  = [];
    querySnapshot.forEach((doc)=>{
      posts.push(doc.data());
    });
    console.log(posts);
    return posts;
  }
}
