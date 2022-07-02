import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('alert', [
      transition(
        'void => *',
        animate(
          5000,
          keyframes([
            style({ bottom: '-10%', opacity: 0, offset: 0 }),
            style({ bottom: '10px', opacity: 1, offset: 0.1 }),
            style({ opacity: 1, offset: 0.8 }),
            style({ opacity: 0, offset: 1 }),
          ])
        )
      ),
    ]),
  ],
})
export class AlertComponent implements OnInit {
  @Input() message!: string;
  @Output() closeAlert = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => this.closeAlert.emit(), 5000);
  }
}
