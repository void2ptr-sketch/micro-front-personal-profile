import { Component, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, NavigationComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly contentRef = viewChild.required<ElementRef<HTMLElement>>('content');

  private readonly navigationSubscription = this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe(() => {
      this.resetContentScroll();
    });

  ngOnDestroy(): void {
    this.navigationSubscription.unsubscribe();
  }

  private resetContentScroll(): void {
    this.contentRef().nativeElement.scrollTop = 0;
  }
}
