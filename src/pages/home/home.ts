import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private fb: Facebook, public navCtrl: NavController) {

  }

  loginFacebook() {
    this.fb.login([ 'public_profile', 'email' ])
      .then((res: FacebookLoginResponse) => {
        console.log(res)
        this.fb.api('/me?fields=id,name,picture', [ 'public_profile' ])
          .then(res => {
            const { name, picture: { data: { url } } } = res
            console.log(name, url)
          })
      })
      .catch(err => console.log('Error logging into Facebook', err));
  }

}
