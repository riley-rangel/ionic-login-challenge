import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user = {
    name: '',
    image: ''
  }

  constructor(private fb: Facebook, public navCtrl: NavController) {

  }

  loginFacebook() {
    this.fb.login([ 'public_profile' ])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('/me?fields=name,picture', [ 'public_profile' ])
          .then(res => {
            const { name, picture: { data: { url } } } = res
            this.user.name = name
            this.user.image = url
          })
      })
      .catch(err => console.log('Error logging into Facebook', err));
  }

}
