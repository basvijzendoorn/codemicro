import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
    private http: HttpClient
    ) { }

  code: string  =
  `function myFunction() {
    document.getElementById("demo1").innerHTML = "Test 1!";
    document.getElementById("demo2").innerHTML = "Test 2!";
  }`;

  getCode() {
    //alert('observable started');
    return this.http.get<string>("http://localhost:8080", {observe: 'body'});
  }


}
