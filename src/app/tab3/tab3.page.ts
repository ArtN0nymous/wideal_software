import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { User, UserResponse, ProviderDatum, UserProfile } from '../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { DataLocalService } from '../services/data-local.service';
import { PostsService } from '../services/posts.service';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user:User={
    providerId : '',
    uid : '',
    displayName : null,
    email : '',
    phoneNumber : null,
    photoURL : null,
    avatar : ''
  }
  users:UserProfile[]=[];
  constructor(private usuarioService:UsuariosService,private datLocal:DataLocalService,private fire:FirebaseService) {}
  logout(){
    this.usuarioService.logout();
  }
  ngOnInit(): void {
    this.user=this.usuarioService.getUsuario();
  }
  async search(event:any){
    this.users = await this.fire.searchUser(event.detail.value);
  }
  /*async actualizar(fActualizar:NgForm){
    if(fActualizar.invalid){
      return;
    }
    const result = await this.usuarioService.actualizarUsuario(this.usuario);
    if(result){
      this.datLocal.mostrarToast('Usuario actualizado');
    }else{
      this.datLocal.mostrarToast('Ha ocurrido un error, no se han actualizado sus datos.');
    }
  }*/
}
