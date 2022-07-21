import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) { }
  id:number;
  private headers = new Headers({ 'Content-Type': 'application/json'});

  products = [];
  fetchData = function() {
    this.http.get("http://test.portalpostal.com.br:8083/secure/customers/").subscribe(
      (res: Response) => {
        this.products = res.json().data.customerList;
      }
    )
  }
  //console.log('products', products);

  deleteProduct = function(id) {
    if(confirm("Are you sure?")) {
      const url = `${"http://test.portalpostal.com.br:8083/secure/customer"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
        .then(() => {
        this.fetchData();
        })
    }
  }

  ngOnInit() {
    this.fetchData();
  }
}
