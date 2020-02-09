import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-d3-p1';
  movieData;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMovieData().subscribe(response => {
      this.movieData = response;
      }
    );
  }

}
