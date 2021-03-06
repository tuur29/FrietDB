import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { GlobalsService } from 'app/services/globals.service';
import { EditDataService } from '../../services/editdata.service';
import { ShopDataService } from '../../services/shopdata.service';
import { SnackDataService } from '../../services/snackdata.service';
import { DialogsService } from '../../dialogs/dialogs.service';
import { MessagesService } from '../../messages/messages.service';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { removeDiacritics } from 'removeDiacritics';

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
  form: FormGroup;
  id: string;
  step = 0;
  isSaved = false;

  @ViewChild('file') file;
  deleteHash: string;

  pendingSnacks: any[] = [];

  allSnacks: any[];
  snackSearchCtrl: FormControl = new FormControl();
  filteredSnacks: Observable<any[]>;

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
        vegi: ["", Validators.maxLength(40)],
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

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event) {
    return !this.form.dirty;
  }

  canDeactivate() {
    if (this.form.dirty && !this.isSaved) {
      return confirm("Bent u zeker dat uw edit geannuleerd mag worden?");
    }
    return true;
  }

  ngOnInit() {

    // show edit snack dialog on router navigate (reload / bookmark)
    if (this.router.url.indexOf('/edit/snack') > -1) {
      this.dialogsService.editsnack(this.route.snapshot.params['id']).subscribe(() => {
        this.router.navigate(['edits']);
      });
    }

    // get proposed edit by id if set
    this.subroute = this.route.params.subscribe((params) => {
      this.id = params['id'] == "shop" ? null : params['id'];
      // deny access
      if (!this.globals.auth.token)
        this.router.navigate(['error', 403, 'edit/' + this.id]);

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
        this.pendingSnacks.splice(i,1);
    });
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  onSubmit(data: any) {
    let flatdata = {
      name: data.part1.name.replace(/^\s+|\s+$/g, ""),
      vegi: data.part1.vegi.replace(/^\s+|\s+$/g, ""),
      image: data.part1.image,
      description: data.part1.description,
      street: data.part2.street.replace(/^\s+|\s+$/g, ""),
      number: data.part2.number,
      municipality: data.part2.municipality.replace(/^\s+|\s+$/g, ""),
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

  onEnter(event) {
    if (event.target.hasAttribute('autocomplete'))
      event.preventDefault();
  }

  fillForm(shop: any) {
    this.form.patchValue({
      part1: {
        name: shop.name,
        vegi: shop.vegi,
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

    shop.snacks.forEach((snack) => {
      this.pushSnackGroup(snack);
    });
  }

  onImageUpload(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        let payload = reader.result.split(',')[1];
        this.globals.uploadToImgur(payload).subscribe((data) => {
          console.log(data);
          if (!data.success) {
            this.messagesService.send("Probleem bij het uploaden van de foto.");
            return;
          }

          this.deleteHash = data.data.deletehash;
          this.form.controls.part1.get("image").disable();
          this.form.controls.part1.get("image").setValue(data.data.link);
        });
      };

    }
  }

  deleteImgurImg(hash: string) {
    this.globals.deleteFromImgur(hash).subscribe((data) => {
      if (!data.success) {
        this.messagesService.send("Probleem bij het verwijderen van de foto.");
        return;
      }

      this.deleteHash = "";
      this.form.controls.part1.get("image").enable();
      this.form.controls.part1.get("image").setValue("");
    });
  }

  lookupCoords() {

    var address = this.form.value.part2.street + " " + this.form.value.part2.number + ", " + this.form.value.part2.municipality + " Belgium ";

    this.globals.getCoordsByAddress(encodeURI(address)).subscribe((data) => {
      if (data.results.length < 1) {
        this.messagesService.send("Er werden geen coördinaten voor dit adres gevonden");
        return;
      }

      var loc = data.results[0].geometry.location;

      // check if in belgium
      if (loc.lat > 51.5 || loc.lat < 50 || loc.lng > 6.5 || loc.lng < 2.5 ) {
        this.messagesService.send("Deze coördinaten liggen niet in België");
        return;
      }

      this.form.controls.part2.get("lat").setValue(loc.lat.toFixed(4));
      this.form.controls.part2.get("lng").setValue(loc.lng.toFixed(4));
    });
  }

  pushSnackGroup(snack?: any, isnew?: boolean) {
    const control = <FormArray> this.form.controls['snacks'];
    control.push( this.fb.group({
      id: snack ? snack.id : '',
      name: snack ? snack.name : '',
      vegi: snack ? snack.vegi : false,
      type: snack ? snack.type : '',
      isnew: isnew ? isnew : false
    }) );
  }

  // editing snacks
  pickSnack(id: string, event?) {
    if (event.source.selected) {
      const control = <FormArray> this.form.controls['snacks'];
      let alreadyAddedSnack = control.controls.find((c) => c.value.id === id);
      if (!alreadyAddedSnack) {
        let newSnack = this.allSnacks.find((s) => s.id === id);
        this.pushSnackGroup(newSnack);
        this.form.markAsDirty();
      }

      setTimeout(() => {
        this.snackSearchCtrl.reset({value: '', disabled: true});
        this.snackSearchCtrl.enable();
      }, 1);
    }
  }

  removeSnack(index: number, id: string, isnew: boolean) {
    this.form.markAsDirty();
    const control = <FormArray> this.form.controls['snacks'];
    control.removeAt(index);
  }

  newSnack() {
    this.dialogsService.editsnack().subscribe((snack) => {
      if (snack) {
        this.pushSnackGroup(snack, true);
        this.form.markAsDirty();
      }
    });
  }

  private normalize(s: string) {
    return removeDiacritics(s.toLowerCase());
  }

  filterSnacks(query: string) {
    return this.allSnacks.filter((snack) =>
      this.normalize(snack.name).indexOf(this.normalize(query)) > -1 || 
      this.normalize(snack.type).indexOf(this.normalize(query)) > -1
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
    this.isSaved = true;

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
