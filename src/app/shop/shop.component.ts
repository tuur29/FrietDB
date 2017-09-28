import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  template: `

    <p>Shop nr {{id}}</p>
  
  `,
  styles: []
})
export class ShopComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
