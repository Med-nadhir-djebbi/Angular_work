import { Directive, HostBinding, HostListener, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  standalone: true,
  host: {
    '[style.color]': 'this.color()',
    '[style.borderColor]': 'this.color()',
    '(keyup)': 'this.onKeyup()',
  }
})
export class RainbowDirective {
  private readonly color = signal(this.randomColor());

  get textColor(): string {
    return this.color();
  }

  get borderColor(): string {
    return this.color();
  }

  onKeyup(): void {
    this.color.set(this.randomColor());
  }

  private randomColor(): string {
    return '#' +
      Math.floor(Math.random() * 0x1000000)
        .toString(16)
        .padStart(6, '0');
  }
}
