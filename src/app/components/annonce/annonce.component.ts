import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {

  annonces: Produit[] = [];
  userPhone: number = Number.parseInt( localStorage.getItem('tel')!);

  editedProduct: Partial<Produit> = {};

  constructor( private toastr: ToastrService,private produitService: ProduitService, public sharedService: SharedService) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.produitService.getProduitsByUserPhone(this.userPhone).subscribe(
      (response: Produit[]) => {
        this.annonces = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  Delete(id: number): void {
    this.produitService.deleteProduit(id).subscribe(
      () => {
        this.toastr.error('Annonce supprimée avec succès', 'Succès');
         this.getProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  afficherformulaireupdate(produit: Produit): void {
    this.editedProduct = { ...produit };
  }


  miseajourproduit(form: NgForm): void {
    if (this.editedProduct.id !== undefined) {
      this.produitService.updateProduit(this.editedProduct as Produit).subscribe(
        (response: Produit) => {
          this.toastr.success('Annonce mise à jour avec succès', 'Succès');
          this.getProduits();
        }
      );
    }
  }
  getFileName(filePath: string): string {
    const lastBackslashIndex = filePath.lastIndexOf('\\');  // Utilisez "\\" pour représenter le caractère "\"

    // Utilisez la méthode slice pour extraire la partie après le dernier "\"
    const fileName = filePath.slice(lastBackslashIndex + 1);

    // Retournez le nom du fichier
    return `../../../assets/${fileName}`;
}

}