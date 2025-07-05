import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { ListaNovedadesI } from "../modelos/novedades.interface";
import { tokenRespuestaModelo } from "../modelos/tokenRespuesta.interface";

@Injectable({
  providedIn: 'root'
})
export class SpotiappService {

  protected token:string;
  protected clientId:string;
  protected clientSecret:string;
  protected grantType:string;
  protected token_type: string;
  protected access_token: string;

  constructor(protected http:HttpClient) {
    this.token = "";
    this.token_type = "";
    this.access_token = "";
    this.clientId = "3c7b3c2917b746abace11eb07b18c1e2";
    this.clientSecret = "afe10405a4284958a084909de1352192";
    this.grantType = "client_credentials";
  }

    private async generarToken() {
      const cabecera = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      const body = new HttpParams().set('grant_type',this.grantType).set('client_id',this.clientId).set('client_secret',this.clientSecret);
      const data = await this.http.post<tokenRespuestaModelo>("https://accounts.spotify.com/api/token",body.toString(),{headers: cabecera}).toPromise();
      // @ts-ignore
      this.token = data.token_type + " " + data.access_token;
      return this.token;
    }

  public async getNovedades(){
    const token = await this.generarToken();
    //console.log (token);
    const URL = "https://api.spotify.com/v1/browse/new-releases";
    const parametros = new HttpParams().set("limit",21).set("offset",0);
    const cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
    return this.http.get(URL, {headers:cabecera,params:parametros});
  }

  public async getBusqueda(parametroBusqueda:string){
    const token = await this.generarToken();
    //console.log (token);
    const URL = "https://api.spotify.com/v1/search";
    const parametros = new HttpParams().set("limit",21).set("offset",0).set("market","ES").set("type","artist").set("q",parametroBusqueda);
    const cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
    return this.http.get(URL, {headers:cabecera,params:parametros});
  }

  public async getArtista(id:number){
    const token = await this.generarToken();
    //console.log (token);
    const URL = "https://api.spotify.com/v1/artists/" + id;
    const cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
    return this.http.get(URL,{headers:cabecera});
  }

  public async getMejoresCancionesArtista(id:number){
    const token = await this.generarToken();
    //console.log (token);
    const url = "https://api.spotify.com/v1/artists/" + id + "/top-tracks" ;
    const parametros = new HttpParams().set("market","ES");
    const cabecera = new HttpHeaders().set('Content-Type','application/json').set('Authorization',token);
    return this.http.get(url,{headers:cabecera,params:parametros});
  }

}
