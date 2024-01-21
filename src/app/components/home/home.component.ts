import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed: boolean = false;

  onMenuCollapseChange(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

  ngOnInit(): void {
  }

}
