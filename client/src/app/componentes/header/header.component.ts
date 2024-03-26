import {Component, OnInit} from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzColDirective} from 'ng-zorro-antd/grid';
import {NzIconDirective, NzIconModule} from 'ng-zorro-antd/icon';
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzMenuModule,
    NzFlexDirective,
    NzColDirective,
    NzTooltipDirective,
    NzIconDirective,
    NzButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
