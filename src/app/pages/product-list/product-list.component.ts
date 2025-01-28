import { Component, inject, ViewChild } from '@angular/core';
import { Product } from '../../core/models/data-models';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { Router } from '@angular/router';
import { AppService } from '../../core/Services/app.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    SpinnerComponent,
    ProductCreateComponent,
    DeleteModalComponent,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  Products: Product[] = [];
  spinner: boolean = false;
  selectedProduct: Product = new Product();
  @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;

  router = inject(Router);
  service = inject(AppService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }

  newProduct() {
    this.spinner = true;
    this.router.navigateByUrl('product-create').finally(() => {
      this.spinner = false;
    });
  }

  getProducts() {
    debugger;
    this.spinner = true;
    this.service.getProducts().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.Products = res.body.Data.$values;
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);

        this.spinner = false;
      },
    });
  }

  onDelete(Product: Product) {
    this.spinner = true;
    this.service.deleteProduct(Product.ProductId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('Product Deleted');
          this.toastr.warning('Product Removed', 'Notification');
          this.getProducts();
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
        this.spinner = false;
      },
    });
  }

  onEdit(Product: Product) {
    this.spinner = true;
    this.selectedProduct = Product;
    // Simulate async operation
    setTimeout(() => {
      this.spinner = false;
    }, 500);
  }

  showDeleteModal(Product: Product) {
    this.spinner = true;
    debugger;
    this.selectedProduct = Product;
    this.deleteModal.context = Product;
    this.deleteModal.show();
    this.spinner = false;
  }

  handleDeleteModal(res: { action: boolean; context: Product }) {
    this.spinner = true;
    if (res.action) {
      this.onDelete(res.context);
    } else {
      console.log('Failed' + res.action);
    }
    this.selectedProduct = new Product();
    this.spinner = false;
  }
}
