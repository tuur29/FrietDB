// TODO: Show edit shop link when logged in
// TODO: Show edit snacks popups when logged in
// TODO: Load ratings & price/quality from third party api (link & min number of reviews)

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogsService } from '../../dialogs/dialogs.service';
import { GlobalsService } from 'globals.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  private subroute: any;
  private reqId: any;

  shop;
  snacks: any[];

  constructor(
    private globals: GlobalsService,
    private route: ActivatedRoute,
    private dialogsService: DialogsService,
  ) {
    this.shop = globals.shops[0];
    this.snacks = globals.snacks;
  }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
       this.reqId = +params['id']; // (+) converts string 'id' to a number
    })
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

  openDialog(snack) {
    if (snack.image || snack.link)
      this.dialogsService.snackinfo(snack.id);
  }

}