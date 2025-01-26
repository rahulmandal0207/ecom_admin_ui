import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../../core/models/data-models';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  isVisible = false;

  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to remove this record';
  @Input() context: any;

  @Output() modalResponse = new EventEmitter<{
    action: boolean;
    context: any;
  }>();

  show() {
    this.isVisible = true;
  }

  close(action: boolean) {
    debugger;
    this.isVisible = false;
    this.modalResponse.emit({ action: action, context: this.context });
  }
}
