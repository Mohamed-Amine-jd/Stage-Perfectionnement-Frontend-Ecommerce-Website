import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  phone= sessionStorage.getItem('phone');
   

  constructor(public router: Router) { }

  logOut() {
    localStorage.removeItem('tel')
    this.router.navigate(['/produit']);
  }

  
}
