import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: Http) { }
  confirmationString:string = "New costumer has been added";
  isAdded: boolean = false;
  productObj:object = {};

  addNewProduct = function(product) {
    //console.log('product', product);
    product.id = null;

    this.productObj = {
      "id": product.id,
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
    console.log(this.productObj);
    this.http.post("http://test.portalpostal.com.br:8083/secure/customer/", this.productObj)
    .subscribe((res:Response) => {
      this.isAdded = true;
    })
  }

  ngOnInit() {
  }

}
