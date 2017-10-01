// TODO: Improve form look (all fields, spacing, autocomplete snack & shop selector, info over maps coords)
// TODO: Skip first step if id is set
// TODO: Auto fill forms
// TODO: Redirect to error when not loggedin
// TODO: Disable all inputs and show review buttons when admin

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editshop',
  templateUrl: './editshop.component.html',
  styles: [`

    .mat-expansion-panel-header-title, 
    .mat-expansion-panel-header-description {
      flex-basis: 0;
    }

    .mat-expansion-panel-header-description {
      justify-content: space-between;
      align-items: center;
    }

  `]
})
export class EditShopComponent implements OnInit {

  step = 0;

  constructor() { }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
