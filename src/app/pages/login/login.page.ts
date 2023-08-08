import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { DataLocalService } from '../../services/data-local.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides!: IonSlides;
  constructor(private userService:UsuariosService,private dataLocal:DataLocalService,private navCtrl:NavController) { }
  loginUser={
    user:'exampleq@mail.com',
    pass:'123456',
  };
  usuario:User={
    email:'test',
    password:'123456',
    nombre:'Test',
    avatar:'av-1.png'
  };
  ngOnInit() {

  }
  //BLOQUEAR SLIDES
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }
  login(fLogin:NgForm){
    
    if(fLogin.invalid){
      return;
    }
    this.userService.login(this.loginUser.user,this.loginUser.pass).then((res:any)=>{
      console.log(res);
      if(res){
        //navegar
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
      }else{
        //alerta
        this.dataLocal.mostrarToast('Usuario o contraseña incorrecta');
      }
    });
  }
  register(fRegister:NgForm){
    if(fRegister.invalid){return;};
    this.userService.register(this.usuario).then((res:any)=>{
      if(res){
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
      }else{
        this.dataLocal.mostrarToast('El correo electrónico ya existe');
      }
    });
      
  }
  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
