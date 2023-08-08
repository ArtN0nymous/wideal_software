import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  _storage:Storage|null=null;
  constructor(private storage:Storage,private toastCtrl:ToastController) {
    this.init();
  }
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }
  async mostrarToast(message:string){
    const toast = await this.toastCtrl.create({
      message,
      position:'top',
      duration:1500
    });
    toast.present();
  }
}
