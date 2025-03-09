import {AfterViewInit, Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  bones = [];

  ngAfterViewInit(): void {
    this.animateSkeleton();
  }

  animateSkeleton() {
    const parts = document.querySelectorAll('.skeleton-part');

    parts.forEach((part, index) => {
      (part as HTMLElement).style.opacity = '0';
      (part as HTMLElement).style.transition = `transform 1.5s ease ${index * 300}ms, opacity 1s`;

      // Random initial position
      const randomX = Math.random() * 600 - 300; // Between -300px to 300px
      const randomY = Math.random() * 500 - 250; // Between -250px to 250px

      (part as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px)`;

      setTimeout(() => {
        (part as HTMLElement).style.opacity = '1';
        (part as HTMLElement).style.transform = 'translate(0, 0)';
      }, 500); // Delay before animation starts
    });
  }

}
