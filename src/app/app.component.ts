import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'progressBar';
  progressBarFilled = false;
  showContent = 1;
  progress = 0;
  scrollPosition = 0;
  heightOfBar: any;
  color: any;
  activeHeadingIndex = -1;
  transition:any;
  imgurl = 'https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg';
  imgUrlArray = [
    'https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/12/11/15/34/lion-3012515_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/03/28/eagle-1867067_1280.jpg'
  ];

  private destroy$: Subject<void> = new Subject<void>();
  private subscription?: Subscription;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (this.scrollPosition > 300 && !this.progressBarFilled) {
      this.progressBarFilled = true;
      this.animateProgressBar();
      this.openContent();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription?.unsubscribe();
  }

  animateProgressBar() {
    interval(50)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.progress = Math.min(this.progress + 12, 100);
      });
  }

  openContent() {
    let temp = 1;
    this.activeHeadingIndex = 1;
    this.showContent = temp;
    this.imgurl = this.imgUrlArray[temp - 1];
    this.subscription = interval(2000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (temp <= 3) {
          this.showContent = temp;
          this.activeHeadingIndex = temp;
          this.imgurl = this.imgUrlArray[temp - 1];
          temp++;
        } else {
          this.subscription?.unsubscribe();
        }
      });
  }

  toggleFunction(number: number) {
    this.showContent = number;
    this.destroy$.next();
    this.destroy$.complete();
    this.progressBarFilled = true;
    this.scrollPosition = 0;
    this.activeHeadingIndex = number;
    switch (number) {
      case 1:
        this.progress = 38;
        this.transition= {'transition' : 'height 1s linear'};
        break;
      case 2:
        this.progress = 70;
        this.transition= {'transition' : 'height 1s linear'};
        break;
      case 3:
        this.progress = 100;
        this.transition= {'transition' : 'height 1s linear'};
        break;
    }
  }
}
