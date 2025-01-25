import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../core/models/data-models';
import { AppService } from '../../core/Services/app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

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
  toastr = inject(ToastrService);

  @Input() userContext: User = new User();
  @Output() userCreatedEvent = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadUserRoles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userContext'] && changes['userContext'].currentValue) {
      this.user = { ...changes['userContext'].currentValue }; // Populate the form with user data
    }
  }

  resetForm() {
    this.user = new User();
  }

  getUser(userId: number) {
    this.spinner = true;
    this.service.getUserById(userId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.user = res.body.Data;
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        //this.showAlert(err);
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
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
          this.toastr.success('User Created', 'Notification');
          this.userCreatedEvent.emit();
          this.resetForm();
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
        //this.showAlert(error);
      },
    });
  }

  updateUser() {
    this.spinner = true;
    this.service.updateUser(this.user.UserId, this.user).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('User Update');
          this.toastr.success('User Update', 'Notification');
          this.userCreatedEvent.emit();
          this.resetForm();
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        //alert('Error' + error.message);
        //this.showAlert(error);
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
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
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        //alert(err);
        //this.showAlert(err);
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
      },
    });
  }
}
