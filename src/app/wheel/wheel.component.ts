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

  lastScrollPosition = 0;
  // onWheelScroll(event: WheelEvent | Event) {
  //   if (!(event instanceof WheelEvent) || event.type !== 'wheel') return;
  //   // this.audio = new Audio('assets/audios/scroll-audio.mp3');
  //   // this.audio.playbackRate = 3.0;
  //   // this.audio.play();
  //   const deltaY = (event as WheelEvent).deltaY; // Get the scroll amount

  //   this.selectedIndex = Math.round(
  //     (this.selectedIndex - (deltaY > 0 ? -1 : 1)) % this.options.length
  //   );

  //   // Ensure selectedIndex stays within bounds
  //   this.selectedIndex =
  //     (this.selectedIndex + this.options.length) % this.options.length;
  // }

  onScroll(event: Event) {
    this.audio = new Audio('assets/audios/scroll-audio.mp3');
    this.audio.playbackRate = 3.0;
    this.audio.play();

    const scrollH = this.timeScrollElement.nativeElement.scrollHeight;
    const scrollStep = scrollH / this.options.length;
    const scrollT = (event.target as HTMLElement).scrollTop;

    if (Math.abs(scrollT - this.lastScrollPosition) >= scrollStep) {
      this.selectedIndex = Math.round(
        (this.selectedIndex - (scrollT > this.lastScrollPosition ? -1 : 1)) %
          this.options.length
      );
      this.lastScrollPosition = scrollT;
    }
  }

  rotateArray(numbersArr: any[], currentNumber: number) {
    if (currentNumber < 1 || currentNumber > numbersArr.length) {
      return [];
    }

    const rotationAmount = (currentNumber - 1) % numbersArr.length;
    const rotatedArray = numbersArr
      .slice(rotationAmount)
      .concat(numbersArr.slice(0, rotationAmount));
    return rotatedArray;
  }
}
