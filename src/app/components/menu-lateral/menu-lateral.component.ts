import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators'; // Importe o operador 'operators' do rxjs
import { MenuStateService } from 'src/app/services/menu-state.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
    dropdownOpen: boolean = false;
    @Output() isCollapsedChange = new EventEmitter<boolean>();
    isCollapsed: boolean = false;
    rotaAtual: string = '';

    private destroy$ = new Subject<void>();

    constructor(private router: Router, private menuStateService: MenuStateService) {}

    ngOnInit(): void {
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      ).subscribe((event: NavigationEnd) => {
        this.rotaAtual = event.urlAfterRedirects?.split('/').pop() || 'home';
      });
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    toggleCollapse(): void {
      this.isCollapsed = !this.isCollapsed;
      this.menuStateService.setIsCollapsed(this.isCollapsed);
    }

    navigateTo(route: string): void {
      if (this.rotaAtual === route) {
        return;
      }
    
      this.rotaAtual = route;
      const nextRoute = route === 'home' ? `/${route}` : `home/${route}`;
      this.router.navigateByUrl(nextRoute);
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    // Função para verificar se um item do menu está ativo
    isMenuItemActive(route: string): boolean {
      return this.rotaAtual === route;
    }
  }