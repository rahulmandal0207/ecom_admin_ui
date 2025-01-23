import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() title:string = "Notification";
  @Input() message:string = "";

  showToast: boolean = false;

  displayToast(message: string, title: string = "Notification") {
    this.title = title;
    this.message = message;
    this.showToast = true;


    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  closeToast() {
    this.showToast = false;
  }
}
