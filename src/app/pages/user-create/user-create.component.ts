import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/data-models';
import { AppService } from '../../core/Services/app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  user: User = new User();
  userRoles: any = [];
  spinner: boolean = false;

  service = inject(AppService);
  router = inject(Router);
  currentUserId: number = 0;
  activatedRoute = inject(ActivatedRoute);


  constructor() {
    this.activatedRoute.params.subscribe({
      next: (res: any) => {
        this.currentUserId = res.UserId;

        if (this.currentUserId) this.getUser(this.currentUserId);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  ngOnInit(): void {
    this.loadUserRoles();
  }

  getUser(userId: number) {
    this.spinner = true;
    this.service.getUserById(userId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.user = res.body.Data;
          console.log(this.user);
        }
        this.spinner = false;
      },
      error: (err: HttpErrorResponse) => {
        this.spinner = false;
        alert(err);
      },
    });
  }

  createUser() {
    debugger;
    this.spinner = true;
    this.service.createUser(this.user).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('User Created');
          this.router.navigateByUrl('/user-list');
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        alert('Error' + error.message);
      },
    });
  }

  updateUser() {
    this.spinner = true;
    this.service.updateUser(this.user.UserId, this.user).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('User Update');
          this.router.navigateByUrl('/user-list');
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        alert('Error' + error.message);
      },
    });
  }

  loadUserRoles() {
    //debugger;
    this.spinner = true;
    this.service.loadUserRoles().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.body.Success) {
          this.userRoles = res.body.Data.$values;
          console.log(this.userRoles);
        }
        this.spinner = false;
      },
      error: (err: HttpErrorResponse) => {
        this.spinner = false;
        alert(err);
      },
    });
  }

 
}
