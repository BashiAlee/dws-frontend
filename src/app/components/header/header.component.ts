import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  isAdmin: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if(this.router.url.split('/')[1]=='admin') {
      this.userInfo = JSON.parse(localStorage.getItem('admin'));
    } else {

      this.userInfo = this.authService.getCurrentUser();
      this.check(this.userInfo.ProfileImage)
    }
   
  }

  check(url) {
    this.authService.checkImageExists(url)
    .subscribe(data =>{
      this.userInfo.ProfileImage = url;
    },
    err => {
      this.userInfo.ProfileImage = "";
    })
  }

  

}
