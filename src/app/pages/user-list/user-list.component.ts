import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AppService } from '../../core/Services/app.service';
import { User } from '../../core/models/data-models';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  router = inject(Router);
  service = inject(AppService);
  Users: User[] = [];
  spinner: boolean = false;

  ngOnInit(): void {
    this.getUsers();
  }

  newUser() {
    this.router.navigateByUrl('user-create');
  }

  getUsers() {
    
    this.spinner = true;
    this.service.getUsers().subscribe(
      (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.Users = res.body.Data.$values;
        }
        this.spinner = false;
      },
      (error: HttpErrorResponse) => {
        alert('Error while getting users');
        this.spinner = false;
      }
    );
  }

  onDelete(user: User) {
    if (confirm('Are you sure, you want to delete this recored?')) {
      this.service.deleteUser(user.UserId).subscribe({
        next: (res: any) => {
          if (res.ok && res.body.Success) {
            console.log('User Deleted');
            this.getUsers();
          }
        },
        error: (error) => {
          alert(error.message);
        },
      });
    }
  }

  onEdit(user: User) {
    this.router.navigate(['user-edit', user.UserId]);
  }
}
