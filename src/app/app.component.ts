import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WheelComponent } from './wheel/wheel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WheelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  hours = Array.from({ length: 24 }).map((n, i) => i);
  minutes = Array.from({ length: 60 }).map((n, i) => i);
  seconds = Array.from({ length: 60 }).map((n, i) => i);

  selectedHourIdx = 0;
  selectedminuteIdx = 0;
  selectedSecondIdx = 0;

  timerStarted = false;

  layoutTouched = false;

  startTimer() {
    this.timerStarted = true;
  }
  stopTimer() {
    this.timerStarted = false;
  }
}
