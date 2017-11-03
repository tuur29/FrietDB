import { Component, Inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private subroute: any;
  private id: any;
  private shop: any;

  constructor(
    private ref: ChangeDetectorRef,
    public globals: GlobalsService,
    private shopDataservice: ShopDataService,
    private route: ActivatedRoute,
    public dialogsService: DialogsService,
  ) {}

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.shopDataservice.getShop(this.id).subscribe(shop => {
        this.shop = shop;
        this.ref.detectChanges();
      });
    });
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  handleMoreInfo(snack: any) {
    if (snack.image != "")
      this.dialogsService.snackinfo(snack.id);
    else if (snack.link != "")
      window.open(snack.link);
  }

}
