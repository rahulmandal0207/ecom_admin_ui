import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../core/models/data-models';
import { AppService } from '../../core/Services/app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConstantData } from '../../core/constants/constant-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginRequest: LoginRequest = { Email: '', Password: '' };

  service = inject(AppService);
  router = inject(Router);

  onLogin() {
    //debugger;
    this.service.onLogin(this.loginRequest).subscribe(
      (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          localStorage.setItem(ConstantData.LoggedUser, res.body.Data);
          this.router.navigateByUrl('user');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
