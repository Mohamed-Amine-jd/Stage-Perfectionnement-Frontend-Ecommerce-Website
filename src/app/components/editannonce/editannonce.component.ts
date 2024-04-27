import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-editannonce',
  templateUrl: './editannonce.component.html',
  styleUrls: ['./editannonce.component.css']
})
export class EditannonceComponent {

  annonces: Produit[] = [];
  userPhone: number = 0;

  isEditing: boolean = false;
  editedProduct: Partial<Produit> = {};

  constructor(private toastr: ToastrService,private produitService: ProduitService, public sharedService: SharedService ,private router: Router) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
   this.userPhone = this.sharedService.getTel();
    //const userPhone = sessionStorage.getItem('phone');
    this.produitService.getProduitsByUserPhone(this.userPhone).subscribe(
      (response: Produit[]) => {
        this.annonces = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
