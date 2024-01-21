import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteLabels } from '../enums/route-labels';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav class="breadcrumb font-weight-bold font-italic">
      <ng-container *ngFor="let route of routes; let last = last">
        <div *ngIf="route.url"> {{ route.label }} </div>
        <span *ngIf="!last"> &nbsp;/&nbsp; </span>
      </ng-container>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      position: fixed;
      top: 0;
      right: 0;
      padding: 16px;
      font-size: 14px;
      color: #a52a2a;
      background-color: silver;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  routes: { url: string, label: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/').filter(segment => segment !== '');
        this.routes = urlSegments.map((segment, index) => ({
          url: `/${urlSegments.slice(0, index + 1).join('/')}`,
          label: RouteLabels[segment as keyof typeof RouteLabels] || segment,
        }));
      });
  }
}
