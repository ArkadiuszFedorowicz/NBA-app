import { Component, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable()
export class AppComponent {
  title = 'nba-app';
  options = { method: 'GET' };

  httpOptions = {
    headers: new HttpHeaders({
      'X-RapidAPI-Key': '9d0997c6d7msh7d81395d24b7f91p1bef01jsn6794dc0613f8',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
    }),
  };

  constructor(private http: HttpClient) {}

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '9d0997c6d7msh7d81395d24b7f91p1bef01jsn6794dc0613f8',
  //     'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  //   }
  // };

  // fetch('https://api-nba-v1.p.rapidapi.com/games/statistics?id=10403', options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));
}
