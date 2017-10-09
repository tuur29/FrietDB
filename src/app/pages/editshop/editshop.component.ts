// TODO: Improve validation

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'globals.service';
import { EditsService } from '../../edits.service';
import { DialogsService } from '../../dialogs/dialogs.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-editshop',
  templateUrl: './editshop.component.html',
  styleUrls: ['./editshop.component.css']
})
export class EditShopComponent implements OnInit, OnDestroy {

  subroute: any;
  editId: number;
  step = 0;
  shop: any;
  snacks: any[];
  snackCtrl: FormControl = new FormControl();
  filteredSnacks: Observable<any[]>;
  @ViewChild('form') form;

  constructor(
    public globals: GlobalsService,
    public editsService: EditsService,
    public dialogsService: DialogsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.shop = Object.assign({}, globals.shops[0]);
    this.snacks = globals.snacks;
  }

  ngOnInit() {
    // get propesed edit by id if set
    this.subroute = this.route.params.subscribe((params) => {
      this.editId = params['id'];
    });

    // deny access
    if (!this.globals.auth.token)
      this.router.navigate(['error', 403, 'edit/shop/' + this.editId]);

    // deny admins to make new shops
    if (this.globals.auth.admin && this.editId === undefined)
      this.router.navigate(['error', 400, '/edits']);

    this.filteredSnacks = this.snackCtrl.valueChanges
      .startWith(null)
      .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  // filter snacks on search
  filterSnacks(query: string) {
    return this.snacks.filter((snack) =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  // click snack in search
  pickSnack(id: number, event?) {
    if (event.source.selected) {
      let alreadyAddedSnack = this.shop.snacks.find((s) => s.id === id);
      if (!alreadyAddedSnack) {
        let newSnack = this.snacks.find((s) => s.id === id);
        this.shop.snacks.push(newSnack);
        this.updateSnacksList();
      }

      setTimeout(() => {
        this.snackCtrl.reset({value: '', disabled: true});
        this.snackCtrl.enable();
      }, 1);

    }
  }

  removeSnack(id: number) {
    this.shop.snacks = this.shop.snacks.filter((e) => {
      return e.id !== id;
    });
  }

  // stepper functions
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  newSnack() {
    this.dialogsService.editsnack(undefined).subscribe(() => {
      this.updateSnacksList();
    });
  }

  // force update shop.snacks
  updateSnacksList() {
    this.shop.snacks = this.shop.snacks.slice();
  }

  save() {
    if (this.form.nativeElement.checkValidity())
      this.editsService.saveedit('shop', this.shop);
  }

  // return to best page based on which user
  back() {
    if (this.globals.auth.admin)
      this.router.navigate(['/edits']);
    else
      this.router.navigate(['/shop/' + this.shop.id]);
  }

}
