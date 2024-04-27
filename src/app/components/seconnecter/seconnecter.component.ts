import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seconnecter',
  templateUrl: './seconnecter.component.html',
  styleUrls: ['./seconnecter.component.css']
})
export class SeconnecterComponent {

  loginForm: FormGroup;

  constructor(private toastr: ToastrService,private fb: FormBuilder, private userService: UserService, private router: Router,private sharedService: SharedService) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      md: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
 login(form: NgForm): void {
    if (form.valid) {
      const { phone, md } = form.value;
      const tel=form.value.phone;
      localStorage.setItem( "tel", tel);
      
    this.sharedService.setTel(tel);

      this.userService.login(phone, md).subscribe(
        (response: any) => {
          console.log('Server Response:', response);
          const role = response.role;
         ;
         this.toastr.success('Connecter','succès');
          if (role === 'user') {
           
            this.router.navigate(['/homeuser']);
          } else if (role === 'admin') {
            this.router.navigate(['/homeadmin']);
          } 
        },
        error => {
          this.toastr.error('Veuillez vérifier vos données','Erreur');
          
        }
      );
    }
  }

}
