import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ImagesService } from './services/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  imageData = [];
  status = 'Loading images....';

  searchForm: FormGroup;

  constructor(
    private images: ImagesService
  ){
    this.searchForm = new FormGroup({      
      'tags': new FormControl(name),
    });
  }

  ngOnInit(){    
    this.images.getImages().map(data => {            
      data.items.forEach(element => {        
        element.media = element.media.m
      });
      return data;
    }).subscribe(
      data => {        
        this.imageData = data.items;
        this.status = '';
      }
    );    
  }
  
  search(){        
    var tags = this.searchForm.value.tags.replace(' ', ',').replace('_',',').split(' ').join('').split('_').join('');
    this.imageData = [];
    this.status = 'Searching images...';
    if(tags != ''){
      this.images.searchImages(tags).map(data => {            
        data.items.forEach(element => {        
          element.media = element.media.m
        });
        return data;
      }).subscribe(
        data => {        
          this.imageData = data.items;
          this.status = data.items.length > 0 ? '' : 'No images found';
        }
      );
    }else{
      location.reload();
    }        
  }

  getTitle(title: string, author: string){        
    return title + ' <br/> ' + '<small>' +author.replace('nobody@flickr.com ("' ,'').replace('")','') + '</small>';
  }
}
