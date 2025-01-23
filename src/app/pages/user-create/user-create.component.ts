import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/data-models';
import { AppService } from '../../core/Services/app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  user: User = { UserId: 0, Email: '', Password: '', Role: 0, RoleName: '' };
  userRoles: any = [];

  service = inject(AppService);
  router = inject(Router);
  currentUserId: number = 0;
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe({
      next: (res: any) => {
        this.currentUserId = res.UserId;
        if (this.currentUserId != 0) this.getUser(this.currentUserId);
      },
    });
  }

  ngOnInit(): void {
    this.loadUserRoles();
  }

  getUser(userId: number) {
    this.service.getUserById(userId).subscribe({
      next: (res: any) => {
        if (res.ok && res.body.Success) {
          this.user = res.body.Data;
          console.log(this.user);
        }
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  createUser() {
    //debugger;
    this.service.createUser(this.user).subscribe({
      next: (res: any) => {
        if (res.ok && res.body.Success) {
          console.log('User Created');
          this.router.navigateByUrl('/user-list');
        }
      },
      error: (error) => {
        alert('Error' + error.message);
      },
    });
  }

  loadUserRoles() {
    debugger;
    this.service.loadUserRoles().subscribe({
      next: (res: any) => {
        if (res.Success) {
          this.userRoles = res.Data.$values;
          console.log(this.userRoles);
        }
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
