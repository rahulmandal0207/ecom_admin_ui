import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  selectedUser: User = new User();

  @ViewChild('deleteModal') deleteModal?: ElementRef | undefined;

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
          this.getUsers();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
    this.closeModal();
  }

  onEdit(user: User) {
    this.router.navigate(['user-edit', user.UserId]);
  }

  openModal(user: User) {
    this.selectedUser = user;
    if (this.deleteModal) {
      const modalElement = this.deleteModal.nativeElement;
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  closeModal() {
    this.selectedUser = new User();
    if (this.deleteModal) {
      const modalElement = this.deleteModal.nativeElement;
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
}
