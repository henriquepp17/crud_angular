import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data:object = {};
  products = [];
  exist = false;
  productObj:object = {};
  private headers = new Headers({ 'Content-Type': 'application/json'});

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  updateProduct(product) {
    this.productObj = {
      "id": this.id,
      "name": product.name,
      "email": product.email,
      "federalId": product.federalId,
      "registration": product.registration,
      "phone": product.phone,
      "phone2": product.phone2,
      "emailCollection": product.emailCollection,
      "residentialPhone": product.residentialPhone,
      "commercialPhone": product.commercialPhone,
      "emergencyContact": product.emergencyContact,
      "emergencyPhone": product.emergencyPhone,
      "birthday": product.birthday,
      "gender": product.gender,
      "federalIdType": product.federalIdType,
      "active": product.active
    };
    console.log('updated', this.productObj);
    this.http.put(`${"http://test.portalpostal.com.br:8083/secure/customer"}/${this.id}`, this.productObj, {headers: this.headers})
    .subscribe(
      (res: Response) => {
        //console.log('to updtade', res);
        this.router.navigate(['/']);
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http.get(`${"http://test.portalpostal.com.br:8083/secure/customer"}/${this.id}`)
    .subscribe(
      (res: Response) => {
        this.data = res.json().data.customer;
        console.log('to update', this.data);
      }
    )

  }

}

