import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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

    // toggleCollapse(): void {
    //     this.isCollapsed = !this.isCollapsed;
    //     this.isCollapsedChange.emit(this.isCollapsed);
    // }

    constructor(private router: Router, private menuStateService: MenuStateService) {}

    ngOnInit(): void {
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
  }