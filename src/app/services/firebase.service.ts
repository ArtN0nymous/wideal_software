import { Injectable } from '@angular/core';
import { Firestore,collection,collectionData,addDoc,setDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User as FireUser} from '@angular/fire/auth';
import { Storage } from '@ionic/storage-angular';
import { UsuariosService } from './usuarios.service';
import { User } from '../interfaces/interfaces';
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
      this.user.displayName = displayName;
      this.user.avatar = 'av-1.png';
      await addDoc(this.userRef, this.user);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateProfile(user:FireUser,displayName:string,photoURL:string){
    return await updateProfile(user,{displayName,photoURL});
  }
}
