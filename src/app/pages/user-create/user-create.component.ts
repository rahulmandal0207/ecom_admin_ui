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
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../core/models/data-models';
import { AppService } from '../../core/Services/app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, formatCurrency } from '@angular/common';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    UserId: new FormControl(0),
    Email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    Role: new FormControl(null, [Validators.required]),
  });

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
      this.populateForm(changes['userContext'].currentValue); // Populate the form with user data
    }
  }

  populateForm(userData: any) {
    this.userForm.patchValue({
      UserId: userData.UserId,
      Email: userData.Email,
      Password: userData.Password,
      Role: userData.Role,
    });
  }

  resetForm() {
    this.user = new User();
    this.userForm.reset();
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
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
      },
    });
  }

  createUser() {
    debugger;
    this.spinner = true;
    this.user = this.userForm.value;
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
      },
    });
  }

  updateUser() {
    this.spinner = true;
    this.user = this.userForm.value;
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

        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
      },
    });
  }

  loadUserRoles() {
    debugger;
    this.spinner = true;
    this.service.loadUserRoles().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.body.Success) {
          this.userRoles = res.body.Data;
          console.log(this.userRoles);
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;

        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
      },
    });
  }
}
