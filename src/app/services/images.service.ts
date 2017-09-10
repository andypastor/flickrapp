import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImagesService {

  constructor(
    private http: Http,
  ) { }

  getImages(){
    return this.http.get('api/images')
    .map(res => res.json()).map(data => {                        
      data.items.forEach(element => {        
        element.media = element.media.m
      });
      return data;
    });    
  }

  searchImages(tags:string){
    return this.http.get('api/search/'+tags)
    .map(res => res.json()).map(data => {
      data.items.forEach(element => {        
        element.media = element.media.m
      });
      return data;
    });
  }
}
