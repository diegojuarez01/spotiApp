import { Component, OnInit } from '@angular/core';
import { SpotiappService } from '../shared/spotiappService/spotiapp.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public busqueda: Array<any>;
  public parametroBusqueda: string;
  public cargandoContenido: boolean;

  constructor(protected spotiappservice: SpotiappService) {
    this.busqueda = [];
    this.parametroBusqueda = "";
    this.cargandoContenido = true;
  }

  ngOnInit(): void {
  }

  async obtenerBusqueda(){
    this.cargandoContenido = true;
      (await this.spotiappservice.getBusqueda(this.parametroBusqueda)).subscribe(data=>{
      this.busqueda = (data as any).artists.items;
    });
    this.cargandoContenido = false;
   }

}
