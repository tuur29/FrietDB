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

  subroute: any;
  reqId: any;
  shop: any;

  constructor(
    public globals: GlobalsService,
    private route: ActivatedRoute,
    public dialogsService: DialogsService,
  ) {
    this.shop = globals.shops[0];
  }

  ngOnInit() {
    this.subroute = this.route.params.subscribe(params => {
       this.reqId = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.subroute.unsubscribe();
  }

}
