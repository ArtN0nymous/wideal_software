import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent  implements OnInit {

  constructor() { }
  @Output() avatarSel= new EventEmitter<string>();
  ngOnInit() {
    this.avatars.forEach((av)=>{
      av.seleccionado=false
      if(av.img===this.seleted){
        av.seleccionado=true;
      }
    });
  }
  avatarSlideOpts={
    slidesPerView:3.5
  };
  @Input() seleted:any;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];
  seleccionar(avatar:any){
    this.avatars.forEach(av=>av.seleccionado=false);
    avatar.seleccionado = true;
    this.avatarSel.emit(avatar.img);
  }
}
