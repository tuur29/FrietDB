// TODO: Fix placement of more info about markdown link
// TODO: Improve validation

import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'app/services/globals.service';
import { EditDataService } from '../../services/editdata.service';
import { ShopDataService } from '../../services/shopdata.service';
import { SnackDataService } from '../../services/snackdata.service';
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
  id: string;
  step = 0;
  shop: any = {};
  snacks: any[];
  snackCtrl: FormControl = new FormControl();
  filteredSnacks: Observable<any[]>;
  @ViewChild('form') form;

  constructor(
    private ref: ChangeDetectorRef,
    public globals: GlobalsService,
    public editDataService: EditDataService,
    public shopDataService: ShopDataService,
    public snackDataService: SnackDataService,
    public dialogsService: DialogsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    // get propesed edit by id if set
    this.subroute = this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (this.globals.auth.admin) {
        this.editDataService.getItem(this.id).subscribe(shop => {
          this.shop = shop;
          this.ref.detectChanges();
        });
      } else if (this.id) {
        this.shopDataService.getShop(this.id).subscribe(shop => {
          this.shop = shop;
          this.ref.detectChanges();
        });
      }

      // deny access
      if (!this.globals.auth.token)
        this.router.navigate(['error', 403, 'edit/shop/' + this.id]);

      // deny admins to make new shops
      if (this.globals.auth.admin && this.id === undefined)
        this.router.navigate(['error', 403, '/edits']);


    });

    this.snackDataService.getSnacks().subscribe(snacks => {
      this.snacks = snacks;
      this.filteredSnacks = this.snackCtrl.valueChanges
        .startWith(null)
        .map(snack => snack ? this.filterSnacks(snack) : this.snacks.slice());
      // this.ref.detectChanges();
    });
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
  pickSnack(id: string, event?) {
    if (event.source.selected) {

      if (!this.shop.snacks) this.shop.snacks = [];

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

  removeSnack(id: string) {
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
    this.dialogsService.editsnack(undefined).subscribe((result) => {
      if (result)
        this.shop.snacks.push(result);
      this.updateSnacksList();
    });
  }

  // force update shop.snacks
  updateSnacksList() {
    this.shop.snacks = this.shop.snacks.slice();
  }

  // return to best page based on which user
  back() {
    if (this.globals.auth.admin)
      this.router.navigate(['/edits']);
    else if (this.id)
      this.router.navigate(['/shop/' + this.shop.id]);
    else
      this.router.navigate(['/']);
  }

  save() {
    // if (this.form.nativeElement.checkValidity()) {
      this.editDataService.saveEdit('shop',this.shop).subscribe((res) => {
        this.back();
      });
    // }
  }

  // pressing admin buttons
  accept(id: string) {
    this.editDataService.accept(id).subscribe((res) => {
      this.back();
    });
  }

  remove(id: string) {
    this.editDataService.remove(id).subscribe((res) => {
      this.back();
    });
  }

}
