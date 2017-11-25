import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

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

  async loginFacebook() {
    try {
      const connected = await this.fb.getLoginStatus()
      if (connected.status === 'connected') await this.fb.logout()
      await this.fb.login([ 'public_profile' ])
      const res = await this.fb.api('/me?fields=name,picture', [ 'public_profile' ])
      const { name, picture: { data: { url } } } = res
      this.user.name = name
      this.user.image = url
    }
    catch(err) {
      console.error(err)
    }
  }

  logoutFacebook() {
    this.fb.logout()
      .then(() => {
        this.user.name = ''
        this.user.image = ''
      })
      .catch(err => console.error(err))
  }

}
