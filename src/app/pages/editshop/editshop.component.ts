// TODO: Improve form look (all fields, spacing, autocomplete snack & shop selector, info over maps coords)
// TODO: Skip first step if id is set
// TODO: Auto fill forms
// TODO: Disable all inputs and show review buttons when admin
// TODO: Send accept/deny events to seperate component?

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'globals.service';

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
export class EditShopComponent implements OnInit, OnDestroy {

  private subroute: any;

  id: number;
  step = 0;

  constructor(
    private globals: GlobalsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    })
    if (!this.globals.auth.token)
      this.router.navigate(['error', 403, "edit/shop/"+this.id]);
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
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
