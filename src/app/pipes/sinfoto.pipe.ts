import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
 name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {
 transform(imagenes: any[] ): string {
 let noimage = 'assets/img/noimage.png';
 if( !imagenes ){
 return noimage;
 }
 return ( imagenes.length > 0 )? imagenes[0].url : noimage;
 }
}
