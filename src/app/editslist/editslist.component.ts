// TODO: Review edits (shops & snacks)
// TODO: Redirect to error when not admin

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editslist',
  template: `

    <p>
      MD-TABLE Shops
    </p>

    <p>
      MD-TABLE Snacks
    </p>

  `,
  styles: []
})
export class EditsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
