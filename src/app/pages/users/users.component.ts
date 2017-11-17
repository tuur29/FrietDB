import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'app/services/userdata.service';

@Component({
  selector: 'app-home',
  template: `

    <mat-card class="small">

      <h2>Gebruikers</h2>
      <mat-list>
        <mat-list-item *ngFor="let user of users;let i=index">

          <strong>{{ user.name }}</strong>: {{ user.email }}
          <span class="spacer"></span>

          <ng-container *ngIf="!user.admin">
            <ng-container *ngIf="user.status == 'DISABLED';else blockbtn">
              <button mat-icon-button aria-label="Keur goed" matTooltip="Keur goed" (click)="approve(user.id, i)">
                <mat-icon>check</mat-icon>
              </button>
            </ng-container>

            <ng-template #blockbtn>
              <button mat-icon-button aria-label="Blokkeer" matTooltip="Blokkeer" (click)="block(user.id, i)">
                <mat-icon>block</mat-icon>
              </button>
            </ng-template>
          </ng-container>

        </mat-list-item>
      </mat-list>

    </mat-card>

  `,
  styles: []
})
export class UsersComponent implements OnInit {

  private users: any[];

  constructor( private userDataService: UserDataService ) {}

  ngOnInit() {
    this.userDataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  approve(id: string, i: number) {
    this.userDataService.approveUser(id).subscribe(user => {
      this.users[i].status = user.status;
    }); 
  }

  block(id: string, i: number) {
    this.userDataService.disableUser(id).subscribe(user => {
      this.users[i].status = user.status;
    }); 
  }

}
