import { Component, OnInit } from '@angular/core';
import { SpotiappService } from '../shared/spotiappService/spotiapp.service';
import { ListaNovedadesI } from '../shared/modelos/novedades.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public novedades: Array<any>;
  public cargandoContenido: boolean;

  constructor(protected spotiappservice: SpotiappService) {
    this.novedades = [];
    this.cargandoContenido = true;
   }

  ngOnInit(): void {
     this.obtenerNovedades();
  }

  async obtenerNovedades(){
     (await this.spotiappservice.getNovedades()).subscribe(data=>{
     this.novedades = (data as any).albums.items;
     this.cargandoContenido = false;
   });
   }

}
