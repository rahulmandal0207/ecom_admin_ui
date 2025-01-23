import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ConstantData } from '../../core/constants/constant-data';
import { ToastComponent } from "../toast/toast.component";
import { SpinnerComponent } from "../spinner/spinner.component";

declare var bootstrap: any;

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent  {
  router = inject(Router);
  

  onLogout() {
    localStorage.removeItem(ConstantData.LoggedUser);
    this.router.navigateByUrl('login');
  }
}
