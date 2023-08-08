import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { NgForm } from '@angular/forms';
import { DataLocalService } from '../services/data-local.service';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
declare var window:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages:string[]=[];
  post = {
    message:'',
    coords:'',
    posicion:false
  }
  cargando:boolean=false;
  constructor(private postService:PostsService,private dataLocal:DataLocalService,private navCtrl:NavController) {}
  async crearPost(){
    const result = await this.postService.post(this.post);
    if(result){
      this.post={
        message:'',
        coords:'',
        posicion:false
      };
      this.tempImages=[];
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
    }else{
      this.dataLocal.mostrarToast('Error, no se ha guardado el post.');
    }
  }
  async getGeo(){
    if(!this.post.posicion){
      this.post.coords='';
      return;
    }
    this.cargando= true;
    const coordinates = await Geolocation.getCurrentPosition();
    const coords = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
    console.log(coords);
    this.post.coords=coords;
    this.cargando=false;
  }

  galeria(){
    this.hasReadPermission();
    window.imagePicker.getPictures(
      (results:any) => {
          for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              this.tempImages.push(results[i]);
              this.postService.subirImg(results[i]);
          }
        }, function (error:any) {
            console.log('Error: ' + error);
        }
    );
  }

  async camara (){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    console.log(imageUrl);
    this.tempImages.push(imageUrl||'');
    this.postService.subirImg(imageUrl||'');
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  };
  hasReadPermission() {
    window.imagePicker.hasReadPermission(
      function(result:any) {
        if(!result){
          window.imagePicker.requestReadPermission();
        }
      }
    )
  }
}
