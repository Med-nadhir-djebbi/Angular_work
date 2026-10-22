import { Directive, HostBinding, HostListener, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  standalone: true
})
export class RainbowDirective {
  private readonly color = signal(this.randomColor());

  @HostBinding('style.color')
  get textColor(): string {
    return this.color();
  }

  @HostBinding('style.borderColor')
  get borderColor(): string {
    return this.color();
  }

  @HostListener('keyup')
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
