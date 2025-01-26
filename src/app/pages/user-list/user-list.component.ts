import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AppService } from '../../core/Services/app.service';
import { User } from '../../core/models/data-models';
import { Router, RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [SpinnerComponent, DeleteModalComponent, UserCreateComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  Users: User[] = [];
  spinner: boolean = false;
  selectedUser: User = new User();
  @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;

  router = inject(Router);
  service = inject(AppService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getUsers();
  }

  newUser() {
    this.router.navigateByUrl('user-create');
  }

  getUsers() {
    this.spinner = true;
    this.service.getUsers().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.Users = res.body.Data.$values;
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        alert('Error while getting users');
        this.spinner = false;
      },
    });
  }

  onDelete(user: User) {
    this.service.deleteUser(user.UserId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('User Deleted');
          this.toastr.warning('User Removed', 'Notification');
          this.getUsers();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onEdit(user: User) {
    this.selectedUser = user;
  }

  showDeleteModal(user: User) {
    debugger;
    this.selectedUser = user;
    this.deleteModal.context = user;
    this.deleteModal.show();
  }

  handleDeleteModal(res: { action: boolean; context: User }) {
    if (res.action) {
      this.onDelete(res.context);
    } else {
      console.log('Failed' + res.action);
    }
    this.selectedUser = new User();
  }
}
