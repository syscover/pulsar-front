import { Component, Inject, forwardRef } from '@angular/core';
import { MainComponent } from './../main.component';

@Component({
  selector: 'ps-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  constructor(@Inject(forwardRef(() => MainComponent)) public app: MainComponent) {}
}
