import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-produitsponso',
  templateUrl: './produitsponso.component.html',
  styleUrls: ['./produitsponso.component.css']
})
export class ProduitsponsoComponent {
public produits : Produit [] =[];
sponso: string = '';
constructor(private toastr: ToastrService,private produitService: ProduitService) {}

ngOnInit(): void {
  this.getProduits();
}

getProduits(): void {
  this.sponso = 'OUI';
  this.produitService.getProduitsBySponso(this.sponso).subscribe(
    (response: Produit[]) => {
      this.produits = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
Delete(id:number){
  this.produitService.deleteProduit(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getProduits();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
AjouterSponso(produit: Produit): void {
  produit.sponso = 'ajout'; 
  this.produitService.updateProduit(produit).subscribe(
    () => {
     this.toastr.success('Produit ajouté à la liste des produits sponsorisés','succès');
      this.getProduits();
    }
  );
}
 getFileName(filePath: string): string {
  const lastSlashIndex = Math.max(filePath.lastIndexOf('\\'), filePath.lastIndexOf('/'));
  if (lastSlashIndex === -1) {
      console.error("No backslash or slash found in the file path.");
      return filePath;
  }
  const fileName = filePath.slice(lastSlashIndex + 1);
  return `../../../assets/${fileName}`;
}


}