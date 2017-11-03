import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EArkiv prototype';
  results: string[];
  root = 'http://localhost:8080/api.php?id=10';
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Make the HTTP request:
    console.log('Starting http request');
    this.http.get(this.root).subscribe(

      data => {
        // Read the result field from the JSON response.
        this.results = data['data'];
        console.log(data['data']);
      },

      err => {
        console.log('Something went wrong');
      }
    );
  }
}
