import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { User, UserResponse, ProviderDatum } from '../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { DataLocalService } from '../services/data-local.service';
import { PostsService } from '../services/posts.service';


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
  constructor(private usuarioService:UsuariosService,private datLocal:DataLocalService, private postService:PostsService) {}
  logout(){
    this.postService.pagina=0;
    this.usuarioService.logout();
  }
  ngOnInit(): void {
    this.user=this.usuarioService.getUsuario();
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
