import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ConstantData } from '../../core/constants/constant-data';

declare var bootstrap: any;

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {
  router = inject(Router);

  onLogout() {
    localStorage.removeItem(ConstantData.LoggedUser);
    this.router.navigateByUrl('login');
  }
}
