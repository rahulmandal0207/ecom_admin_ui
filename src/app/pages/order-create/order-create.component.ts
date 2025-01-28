import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AppService } from '../../core/Services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderDetail, Product } from '../../core/models/data-models';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [SpinnerComponent, FormsModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css',
})
export class OrderCreateComponent {
  Order: Order = new Order();
  OrderDetails: OrderDetail = new OrderDetail();
  OrderStatus: any = [];
  spinner: boolean = false;
  Products: Product[] = [];

  service = inject(AppService);
  router = inject(Router);
  currentOrderId: number = 0;
  activatedRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);

  @Input() OrderContext: Order = new Order();
  @Output() OrderCreatedEvent = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadOrderStatus();
    this.getProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['OrderContext'] && changes['OrderContext'].currentValue) {
      this.Order = { ...changes['OrderContext'].currentValue }; // Populate the form with Order data
    }
  }

  resetForm() {
    this.Order = new Order();
  }

  getProducts() {
    //debugger;
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

  getOrder(OrderId: number) {
    this.spinner = true;
    this.service.getOrderById(OrderId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          this.Order = res.body.Data;
        }
        this.spinner = false;
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false;
        this.toastr.error(error.error.title, 'Error: ' + error.error.status);
      },
    });
  }

  createOrder() {
    debugger;
    this.spinner = true;

    this.Order.UserId = 1; // hardcoding
    //this.Order.OrderDetails = this.OrderDetails;

    this.service.createOrder(this.Order).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('Order Created');
          this.toastr.success('Order Created', 'Notification');
          this.OrderCreatedEvent.emit();
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

  updateOrder() {
    this.spinner = true;
    this.service.updateOrder(this.Order.OrderId, this.Order).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.ok && res.body.Success) {
          console.log('Order Update');
          this.toastr.success('Order Update', 'Notification');
          this.OrderCreatedEvent.emit();
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

  loadOrderStatus() {
    //debugger;
    this.spinner = true;
    this.service.loadOrderStatus().subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.body.Success) {
          this.OrderStatus = res.body.Data.$values;
          console.log(this.OrderStatus);
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
