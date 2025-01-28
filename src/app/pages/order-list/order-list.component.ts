import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { Order } from '../../core/models/data-models';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { Router } from '@angular/router';
import { AppService } from '../../core/Services/app.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from '../order-create/order-create.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    SpinnerComponent,
    DeleteModalComponent,
    CommonModule,
    OrderCreateComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  Orders: Order[] = [];
  spinner: boolean = false;
  selectedOrder: Order = new Order();
  @ViewChild('deleteModal') deleteModal!: DeleteModalComponent;

  router = inject(Router);
  service = inject(AppService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getOrders();
  }

  newOrder() {
    this.router.navigateByUrl('Order-create');
  }

  getOrders() {
    debugger;
    this.spinner = true;
    this.service.getOrders().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.Orders = res.body.Data;
          console.log(this.Orders);
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        alert('Error while getting Orders');
        this.spinner = false;
      },
    });
  }

  onDelete(Order: Order) {
    this.service.deleteOrder(Order.OrderId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('Order Deleted');
          this.toastr.warning('Order Removed', 'Notification');
          this.getOrders();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onEdit(Order: Order) {
    this.selectedOrder = Order;
  }

  showDeleteModal(Order: Order) {
    debugger;
    this.selectedOrder = Order;
    this.deleteModal.context = Order;
    this.deleteModal.show();
  }

  handleDeleteModal(res: { action: boolean; context: Order }) {
    if (res.action) {
      this.onDelete(res.context);
    } else {
      console.log('Failed' + res.action);
    }
    this.selectedOrder = new Order();
  }
}
