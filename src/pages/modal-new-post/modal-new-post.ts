import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalNewPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-new-post',
  templateUrl: 'modal-new-post.html',
})
export class ModalNewPostPage {

  img: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.img = localStorage.getItem('imgURL')
  }

  newPost(text) {
    let posts = localStorage.getItem('posts');
    if (posts){
      let listaConvertida = JSON.parse(posts);
      listaConvertida.push({imagem: this.img, text:text})
      JSON.stringify(localStorage.setItem('posts', listaConvertida));
    }
    else{
      localStorage.setItem('posts', JSON.stringify({imagem: this.img, text:text}))
    }

    alert(localStorage.getItem('posts'));
    this.dismiss();
  }
}
