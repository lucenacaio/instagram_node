import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from '../../app/AppSettings';
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

  constructor(private alertCtrl: AlertController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  logar(username, password) {
    username = 'mateusrodrigues';
    password = 'senha';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.API_ENDPOINT + '/authenticate', { username, password }, options)
      .subscribe(data => {
        localStorage.setItem('token', data.json().token)
        this.navCtrl.push(HomePage);
      },
      erro => {
        console.log(erro);
        this.presentAlert('O Login Falhou!', erro.json().msg);
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentAlert(title, mensage) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mensage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
