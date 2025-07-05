import { Component, OnInit } from '@angular/core';
import { SpotiappService } from '../shared/spotiappService/spotiapp.service';
import { ActivatedRoute, Router } from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-detalle-artista',
  templateUrl: './detalle-artista.component.html',
  styleUrls: ['./detalle-artista.component.scss']
})
export class DetalleArtistaComponent implements OnInit {

  public artistaImagen: Array<any>;
  public artistaNombre: Array<any>;
  public artistaCanciones: Array<any>;
  public artistaId: number;

  constructor(protected spotiappservice: SpotiappService, protected route: ActivatedRoute,  protected location:Location) {

       this.artistaNombre = [];
       this.artistaImagen = [];
       this.artistaCanciones = [];
       this.artistaId = 0;

       this.route.params.subscribe(parameters => {
          this.artistaId = parameters['artistaId'];
        });
        
   }

  ngOnInit(): void {
    this.obtenerImagenArtista();
    this.obtenerNombreArtista();
    this.obtenerCanciones();
  }
    async obtenerImagenArtista(){
        (await this.spotiappservice.getArtista(this.artistaId)).subscribe(data=>{
        this.artistaImagen = (data as any).images;
        //console.log(this.artistaImagen);
      });
     }

     async obtenerNombreArtista(){
        (await this.spotiappservice.getArtista(this.artistaId)).subscribe(data=>{
         this.artistaNombre = (data as any).name;
         //console.log(this.artistaNombre);
       });
      }

      async obtenerCanciones(){
          (await this.spotiappservice.getMejoresCancionesArtista(this.artistaId)).subscribe(data=>{
          this.artistaCanciones = (data as any).tracks;
          //console.log(this.artistaCanciones);
        });
       }

       volver() {
          this.location.back();
        }


  
}
