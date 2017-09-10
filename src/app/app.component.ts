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
  searchResult = '';

  searchForm: FormGroup;

  constructor(
    private images: ImagesService
  ){
    this.searchForm = new FormGroup({      
      'tags': new FormControl(name),
    });
  }

  ngOnInit(){    
    this.images.getImages().subscribe(
      data => {        
        this.imageData = data.items;
        this.status = '';
      }
    );    
  }
  
  search(){        
    var tags = this.searchForm.value.tags.replace(/ /g, ',').replace(/_/g,',');
    this.imageData = [];    
    if(tags != ''){
      this.status = 'Searching images...';
      this.searchResult = '';
      this.images.searchImages(tags).subscribe(
        data => {
          this.searchForm.reset();
          this.status = '';
          this.searchResult = data.items.length > 0 ? 'Search results for ' + tags + '...' : 'No search results for ' + tags + '...';
          this.imageData = data.items;
        }
      );
    }else{
      this.status = '';
      location.reload();
    }        
  }

  getTitle(title: string, author: string){        
    return title + ' <br/> ' + '<small><i>' +author.replace('nobody@flickr.com ("' ,'').replace('")','') + '</i></small>';
  }
}
