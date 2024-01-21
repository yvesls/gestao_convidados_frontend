import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  isIcon(item: any, column: any): boolean {
    return Array.isArray(item[column.field]);
  }

}
