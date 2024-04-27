import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/interfaces/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponent {
  produit: Produit = {} as Produit;
  connect: number = 0;
  phones: number[] = [];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.connect = this.sharedService.getTel();
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.produitService.getProduitById(productId).subscribe((produit: Produit) => {
        this.produit = produit;
      });
    });
  
    // Load stored phones from browser storage on component initialization
    const storedPhones = localStorage.getItem('tel');
    if (storedPhones) {
      // Convert stored values to numbers before assigning to phones array
      this.phones = JSON.parse(storedPhones).map(Number);
    }
  }
  

  ngOnDestroy() {
    // Save phones to browser storage on component destruction
    localStorage.setItem('tel', JSON.stringify(this.phones));
  }
  signalerProduit(produitId: number): void {
    const userPhone = this.sharedService.getTel();

    // Check if the user's phone exists in the local 'phones' array
    if (this.phones.includes(userPhone)) {
      this.toastr.error('Vous avez déjà signalé ce produit', 'Erreur');
    } else {
      // User is signaling for the first time
      this.phones.push(userPhone); // Add the phone to the local array

      // Perform your other signaling logic here
      this.userService.getUserByPhone(this.produit.phoneuser).subscribe(user => {
        if (user) {
          user.minus += 1;
          this.userService.updateUser(user).subscribe(updatedUser => {
           this.toastr.success('Produit signalé avec succès', 'Succès');
          });
        }
      });
    }
  }

  getFileName(filePath: string): string {
    // Trouver l'index du dernier backslash ou slash
    const lastSlashIndex = Math.max(filePath.lastIndexOf('\\'), filePath.lastIndexOf('/'));

    // Si aucun backslash ou slash n'est trouvé, retourner le chemin d'origine
    if (lastSlashIndex === -1) {
        console.error("No backslash or slash found in the file path.");
        return filePath;
    }

    // Extraire la partie après le dernier backslash ou slash
    const fileName = filePath.slice(lastSlashIndex + 1);

    // Retourner le chemin relatif du fichier avec le dossier assets
    return `../../../assets/${fileName}`;
}


}