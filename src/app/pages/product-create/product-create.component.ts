import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../core/models/data-models';
import { AppService } from '../../core/Services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
  Product: Product = new Product();

  spinner: boolean = false;

  service = inject(AppService);
  router = inject(Router);
  currentProductId: number = 0;
  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  @Input() ProductContext: Product = new Product();
  @Output() ProductCreatedEvent = new EventEmitter<void>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ProductContext'] && changes['ProductContext'].currentValue) {
      this.Product = { ...changes['ProductContext'].currentValue }; // Populate the form with Product data
    }
  }

  resetForm() {
    this.Product = new Product();
  }

  getProduct(ProductId: number) {
    this.spinner = true;
    this.service.getProductById(ProductId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.Product = res.body.Data;
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
      },
    });
  }

  createProduct() {
    debugger;
    this.spinner = true;
    this.service.createProduct(this.Product).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('Product Created');
          this.toastr.success('Product Created', 'Notification');
          this.ProductCreatedEvent.emit();
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

  updateProduct() {
    debugger;
    this.spinner = true;
    this.service.updateProduct(this.Product.ProductId, this.Product).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.toastr.success('Product Update', 'Notification');
          this.ProductCreatedEvent.emit();
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
}
