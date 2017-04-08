import { Component, Inject, forwardRef } from '@angular/core';

import { MainLayoutComponent } from './../main-layout/main-layout.component';

@Component({
  selector: 'ps-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  constructor(@Inject(forwardRef(() => MainLayoutComponent)) public app: MainLayoutComponent) {}
}
