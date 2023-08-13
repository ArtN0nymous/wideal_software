import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { DataLocalService } from '../../services/data-local.service';
import { User } from '../../interfaces/interfaces';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides!: IonSlides;
  constructor(
    private userService:UsuariosService,
    private dataLocal:DataLocalService,
    private navCtrl:NavController,
    private fire:FirebaseService,
    private formBuilder: FormBuilder
  ) { }
  loginUser={
    user:'',
    pass:'',
  };
  usuario:any={
    email:'',
    password:'',
    nombre:'',
    avatar:'av-1.png'
  };
  password2="";
  type = "password";
  ngOnInit() {
  
  }
  show(event:any){
    if(!event.detail.checked){
      this.type = "password";
    }else{
      this.type = "text";
    }
  }
  //BLOQUEAR SLIDES
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }
  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  login(fLogin:NgForm){
    if(!this.validarEmail(this.loginUser.user)){
      this.dataLocal.mostrarToast('Ingresa un correo valido.');
      return;
    }
    /*
    this.userService.login(this.loginUser.user,this.loginUser.pass).then((res:any)=>{
      console.log(res);
      if(res){
        //navegar
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
      }else{
        //alerta
        this.dataLocal.mostrarToast('Usuario o contraseña incorrecta');
      }
    });*/
    this.fire.login(this.loginUser.user,this.loginUser.pass).then((result:any)=>{
      console.log('Login like',result);
    }).catch((err:any)=>{
      this.dataLocal.mostrarToast('Verifica tus datos o vuelve intentarlo más tarde :3.');
    });
  }
  async register(fRegister:NgForm){
    if(!this.validarEmail(this.usuario.email||'')){
      return this.dataLocal.mostrarToast('Ingresa un correo valido.');;
    }
    if(this.usuario.nombre == ''){
      return this.dataLocal.mostrarToast('Ingresa un nombre valido');
    }
    if(this.usuario.password==this.password2){
      try {
        const res = await this.fire.register(
          this.usuario.email,
          this.usuario.password,
          this.usuario.nombre
        );
        if(res){
          this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
        }
      } catch (error:any) {
        console.error(error);
        this.dataLocal.mostrarToast('Error: ' + error.code);
      }
    }else{
      this.dataLocal.mostrarToast('Tus contraseñas no coinciden.');
      return;
    }
    return;
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
