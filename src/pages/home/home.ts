import { Component, Injectable } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from '../../app/AppSettings';

import { ModalNewPostPage } from '../modal-new-post/modal-new-post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {

  token: String;
  posts: any = [];

  constructor(private http: Http, public navCtrl: NavController, private camera: Camera, public modalCtrl: ModalController) {

  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalNewPostPage);
    modal.present();
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: 0,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      alert(imageData);

      localStorage.setItem('imgURL', imageData);
      this.presentModal()

      // let headers = new Headers(
      //   { 'Content-Type': 'application/json', 'x-access-token': this.token }
      // );
      // let options = new RequestOptions({ headers: headers });
      // return this.http.post(AppSettings + '/api/post', { Title: 'username', img_url: imageData }, options)
      //   .subscribe(data => {
      //     // localStorage.setItem('token', data.json().token)
      //     // this.navCtrl.push(HomePage);
      //     alert('pode ter dado certo')
      //   },
      //   erro => {
      //     alert('deu merda')
      //     console.log(erro)
      //   });

      // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  ionViewDidLoad() {
    this.token = localStorage.getItem('token');
    this.getPosts();
    
  }

  newPost() {
    // let headers = new Headers(
    //   { 'Content-Type': 'application/json', 'Authorization': this.token }
    // );
    // let options = new RequestOptions({ headers: headers });
    // return this.http.post('http://9750d74c.ngrok.io/authenticate', { username, password }, options)
    //   .subscribe(data => {
    //     localStorage.setItem('token', data.json().token)
    //     this.navCtrl.push(HomePage);
    //   },
    //   erro => {
    //     console.log(erro)
    //   });
  }

  getPosts(){
    alert(localStorage.getItem('posts'));
    this.posts = JSON.parse(localStorage.getItem('posts'));
  }

}
