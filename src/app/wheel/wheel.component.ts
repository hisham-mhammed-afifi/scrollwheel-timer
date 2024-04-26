import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-wheel',
  standalone: true,
  imports: [],
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.scss',
})
export class WheelComponent {
  @Input() options: any[] = [];

  selectedIndex: number = 0; // Tracks the currently selected Index

  audio!: HTMLAudioElement;

  @ViewChild('timeScroll') timeScrollElement!: ElementRef;

  ngOnInit() {}

  getElementAtIndex(index: number): any | undefined {
    const arrayLength = this.options.length;
    const adjustedIndex = (index + arrayLength) % arrayLength; // Handle negative and positive overflows

    if (adjustedIndex >= arrayLength) {
      return undefined; // Out-of-bounds index
    }
    return this.options[adjustedIndex];
  }

  onHoursScroll(event: WheelEvent | Event) {
    this.audio = new Audio('assets/audios/scroll-audio.mp3');
    this.audio.playbackRate = 3.0;
    this.audio.play();
    const deltaY = (event as WheelEvent).deltaY; // Get the scroll amount
    const scrollStep =
      this.timeScrollElement.nativeElement.scrollHeight / this.options.length; // Calculate scroll step size

    // Update selectedIndex based on scroll direction and step size
    this.selectedIndex = Math.round(
      (this.selectedIndex - (deltaY > 0 ? -1 : 1)) % this.options.length
    );

    // Ensure selectedIndex stays within bounds
    this.selectedIndex =
      (this.selectedIndex + this.options.length) % this.options.length;
  }

  // updateDisplayedTime(index: number) {
  //   const timeCategory = this.getSelectedTimeCategory();
  //   switch (timeCategory) {
  //     case 'hours':
  //       this.hours = this.hourOptions[index];
  //       break;
  //     case 'minutes':
  //       this.minutes = this.minuteOptions[index];
  //       break;
  //     case 'seconds':
  //       this.seconds = this.secondOptions[index];
  //       break;
  //   }
  // }

  // getSelectedTimeCategory(): string {
  //   const scrollTop = this.timeScrollElement.nativeElement.scrollTop;
  //   const threshold1 = (this.hourOptions.length * this.timeScrollElement.nativeElement.scrollHeight) / 3;
  //   const threshold2 =
  //     (this.hourOptions.length * 2 * this.timeScrollElement.nativeElement.scrollHeight) / 3;

  //   if (scrollTop < threshold1) {
  //     return 'hours';
  //   } else if (scrollTop < threshold2) {
  //     return 'minutes';
  //   } else {
  //     return 'seconds';
  //   }
  // }
}
