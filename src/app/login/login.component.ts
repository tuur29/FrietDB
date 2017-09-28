import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <md-card>
      <h2>Wil je deze database helpen uitbreiden?</h2>
      <p>Helaas voeg ik momenteel enkel handmatig nieuwe gebruikers toe. Stuur me een mailtje en dan bezorg ik je zo spoedig mogelijk je inloggegevens.</p>

      <form class="login-form">
        <md-form-field color="accent">
          <input type="email" mdInput placeholder="E-mailadres">
        </md-form-field>

        <md-form-field color="accent">
          <input type="password" mdInput placeholder="Wachtwoord">
        </md-form-field>

        <button md-raised-button color="accent">Login</button>
      </form>
    </md-card>
  `,
  styles: [`

    md-form-field, button {
      margin: 0 10px;
    }

  `]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
