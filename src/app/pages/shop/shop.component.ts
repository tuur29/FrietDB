import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../dialogs/dialogs.service';
import { GlobalsService } from 'app/services/globals.service';
import { ShopDataService } from 'app/services/shopdata.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  subroute: any;
  id: any;
  shop: any;

  constructor(
    public globals: GlobalsService,
    private shopDataservice: ShopDataService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogsService: DialogsService,
  ) {}

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.shopDataservice.getShop(this.id).subscribe(shop => {
        this.shop = shop;
      });
    });
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  removeShop(event?) {
    let question = confirm("Bent u zeker dat u "+ this.shop.name +" wilt verwijderen?");
    if (question)
      this.shopDataservice.removeShop(this.id).subscribe(data => {
        if (data.status == 200)
          this.router.navigate(['/']);
      });
    else event.preventDefault();
  }

  handleMoreInfo(snack: any) {
    if (snack.image != "")
      this.dialogsService.snackinfo(snack.id);
    else if (snack.link != "")
      window.open(snack.link);
  }

}
