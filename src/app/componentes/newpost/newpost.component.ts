import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FirebaseService } from '../../services/firebase.service';
import { ModalController } from '@ionic/angular';
declare var window:any;
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss'],
})
export class NewpostComponent  implements OnInit {

  tempImages:string[]=[];
  post = {
    message:'',
    coords:'',
    posicion:false
  }
  cargando:boolean=false;
  constructor(private fire: FirebaseService, private modalCtrl:ModalController) { }

  ngOnInit() {}

  crearPost(){
    this.fire.savePost(this.post);
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
              this.fire.subirImg(results[i],'Perfiles/Imagenes');
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
    this.fire.subirImg(imageUrl||'','Perfiles/Imagenes');
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
  close(){
    this.modalCtrl.dismiss();
  }
}
