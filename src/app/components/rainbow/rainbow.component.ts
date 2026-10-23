import { Component } from '@angular/core';
import { RainbowDirective } from '../../directives/rainbow.directive';

@Component({
  imports: [RainbowDirective],
  selector: 'app-rainbow',
  styleUrl: './rainbow.component.css',
  templateUrl: './rainbow.component.html',
})
export class RainbowComponent {
}
