import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule, DecimalPipe],
  selector: 'app-ttc-calculator',
  styleUrl: './ttc-calculator.component.css',
  templateUrl: './ttc-calculator.component.html',
})
export class TtcCalculatorComponent {
  readonly kadech_men_kaaba = signal(1);
  readonly soum_lka3ba = signal(0);
  readonly tva = signal(18);

  readonly soum_kaaba_mtaxya = computed( () =>
    this.soum_lka3ba() * (1 + this.tva() / 100)
  );
  readonly rimise = computed(() => {
    const kadech_men_kaaba = this.kadech_men_kaaba();

    if (kadech_men_kaaba > 10 && kadech_men_kaaba <= 15) return 0.20;
    if (kadech_men_kaaba > 15) return 0.30;

    return 0;
  });


  readonly soum_mellekher = computed(() =>
    this.kadech_men_kaaba() * this.soum_lka3ba() * (1 - this.rimise()) * (1 + this.tva() / 100)
  );
}
