import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ajouterproduit',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css','../../../styles.css']
})
export class AjouterproduitComponent {

  public produits: Produit[] = [];
constructor(private toastr: ToastrService,private fb : FormBuilder  ,  private sharedService:SharedService ,private produitService:ProduitService , private router : Router) {}

ngOnInit() {
  this.getProduits();
}

public getProduits(): void {
  this.produitService.getProduits().subscribe(
    (response: Produit[]) => {
      this.produits = response;
      console.log(this.produits);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}


public ajouterproduit(donnee: NgForm): void {
  if (donnee.valid) {
    const produit: Produit = donnee.value;
      produit.sponso = donnee.value.sponsored;
    const userPhone = this.sharedService.getTel();
   
    donnee.value.phoneuser=userPhone;
    localStorage.setItem('addFormData', JSON.stringify(donnee.value));
    this.produitService.addProduit(donnee.value).subscribe(
      
      (response: Produit | string) => {
        localStorage.setItem("produit",donnee.value);
        if (typeof response === 'string') {
          
          window.location.href = response;
          this.getProduits();
        } else {
          console.log('Response is a Produit object:', response);
          
        }
        this.getProduits();
        this.toastr.success('Produit ajouté avec succès','Succès');
        this.router.navigate(['/homeuser']);
      }
    );
  }
}

}
