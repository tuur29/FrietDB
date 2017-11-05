import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'app/services/globals.service';
import { EditDataService } from '../../services/editdata.service';
import { ShopDataService } from '../../services/shopdata.service';
import { SnackDataService } from '../../services/snackdata.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { MessagesService } from '../../messages/messages.service';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-editshop',
  templateUrl: './editshop.component.html',
  styleUrls: ['./editshop.component.css']
})
export class EditShopComponent implements OnInit, OnDestroy {

  private subroute: any;
  private form: FormGroup;
  private id: string;
  private step = 0;

  private pendingSnacks: any[] = [];

  private allSnacks: any[];
  private snackSearchCtrl: FormControl = new FormControl();
  private filteredSnacks: Observable<any[]>;

  constructor(
    public globals: GlobalsService,
    public editDataService: EditDataService,
    public shopDataService: ShopDataService,
    public snackDataService: SnackDataService,
    public dialogsService: DialogsService,
    public messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      part1: this.fb.group({
        name: ["", Validators.required],
        image: ["", Validators.pattern('^https?:\/\/.+$')],
        description: ""
      }),
      part2: this.fb.group({
        street: ["", Validators.required],
        number: ["", [Validators.required, Validators.min(1), Validators.max(10000)]],
        municipality: ["", Validators.required],
        telephone: ["", Validators.pattern('^[\+\.\ \/0-9]+$')],
        email: ["", this.nonRequiredEmailValidator],
        website: ["", Validators.pattern('^https?:\/\/.+$')],
        lat: ["", [Validators.required, Validators.min(-90), Validators.max(90)]],
        lng: ["", [Validators.required, Validators.min(-90), Validators.max(90)]],
      }),
      snacks: this.fb.array([])
    });
  }

  ngOnInit() {
    // get proposed edit by id if set
    this.subroute = this.route.params.subscribe((params) => {
      this.id = params['id'];
      // deny access
      if (!this.globals.auth.token)
        this.router.navigate(['error', 403, 'edit/shop/' + this.id]);

      // deny admins to make new shops
      if (this.globals.auth.admin && this.id === undefined)
        this.router.navigate(['error', 403, '/edits']);

      // load data
      if (this.globals.auth.admin) {
        this.editDataService.getItem(this.id).subscribe(shop => {
          this.fillForm(shop);
        });
        // get pending snacks
        this.editDataService.getPendingSnacks(this.id).subscribe(snacks => {
          this.pendingSnacks = snacks;
          console.log(snacks);
        });
      } else if (this.id) {
        this.shopDataService.getShop(this.id).subscribe(shop => {
          this.fillForm(shop);
        });
      }
    });

    this.snackDataService.getSnacks().subscribe(snacks => {
      this.allSnacks = snacks;
      this.filteredSnacks = this.snackSearchCtrl.valueChanges
        .startWith(null)
        .map(snack => snack ? this.filterSnacks(snack) : this.allSnacks.slice());
    });
  }

  updatePendingSnack(i: number) {
    this.dialogsService.editsnack(this.pendingSnacks[i]._id).subscribe((data)=>{
      if (data)
        window.location.reload();
    });
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  onSubmit(data: any) {
    let flatdata = {
      name: data.part1.name,
      image: data.part1.image,
      description: data.part1.description,
      street: data.part2.street,
      number: data.part2.number,
      municipality: data.part2.municipality,
      telephone: data.part2.telephone,
      email: data.part2.email,
      website: data.part2.website,
      lat: data.part2.lat,
      lng: data.part2.lng,
      snacks: data.snacks.map((snack)=>snack.id)
    }
    if (this.id) flatdata['_id'] = this.id;
    this.editDataService.saveEdit('shop', flatdata).subscribe((res) => {
      this.messagesService.send("Success! Je aanpassing moet wel eerst goedgekeurd worden.");
      this.back();
    });
  }

  fillForm(shop: any) {
    this.form.patchValue({
      part1: {
        name: shop.name,
        image: shop.image,
        description: shop.description
      },
      part2: {
        street: shop.street,
        number: shop.number,
        municipality: shop.municipality,
        telephone: shop.telephone,
        email: shop.email,
        website: shop.website,
        lat: shop.lat,
        lng: shop.lng
      }
    });

    this.form.setControl('snacks', this.fb.array(
      shop.snacks.map((snack) => this.createSnackGroup(snack))
    ));
  }

  createSnackGroup(snack?: any) : FormGroup {
    return this.fb.group({
      id: snack ? snack.id : '',
      name: snack ? snack.name : '',
      type: snack ? snack.type : ''
    });
  }

  // editing snacks
  pickSnack(id: string, event?) {
    if (event.source.selected) {
      const control = <FormArray> this.form.controls['snacks'];
      let alreadyAddedSnack = control.controls.find((c) => c.value.id === id);
      if (!alreadyAddedSnack) {
        let newSnack = this.allSnacks.find((s) => s.id === id);
        control.push(this.createSnackGroup(newSnack));
      }

      setTimeout(() => {
        this.snackSearchCtrl.reset({value: '', disabled: true});
        this.snackSearchCtrl.enable();
      }, 1);
    }
  }

  newSnack() {
    this.dialogsService.editsnack().subscribe((snack) => {
      if (snack) {
        const control = <FormArray> this.form.controls['snacks'];
        control.push(this.createSnackGroup(snack));
      }
    });
  }

  filterSnacks(query: string) {
    return this.allSnacks.filter((snack) =>
      snack.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
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

  // return to best page based on which user
  back() {
    if (this.globals.auth.admin)
      this.router.navigate(['/edits']);
    else if (this.id)
      this.router.navigate(['/shop/' + this.id]);
    else
      this.router.navigate(['/']);
  }

  // pressing admin buttons
  accept() {
    this.editDataService.accept(this.id).subscribe((res) => {
      this.back();
    });
  }

  remove() {
    this.editDataService.remove(this.id).subscribe((res) => {
      this.back();
    });
  }

  private nonRequiredEmailValidator(control: AbstractControl): ValidationErrors {
    if (!control.value) return null;
    return Validators.email(control);
  }

}
