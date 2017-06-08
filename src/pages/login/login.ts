import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

@Injectable()
export class LoginPage {

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  logar(username, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/authenticate', { username, password }, options)
      .subscribe(data => {
        localStorage.setItem('token', data.json().token)
        this.navCtrl.push(HomePage);
      },
      erro => {
        console.log(erro)
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
