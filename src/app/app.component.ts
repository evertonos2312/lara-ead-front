import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "./auth/services/login.service";
import {Usuario} from "./shared/models";
// @ts-ignore
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Consumo familiar';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { this.hideFooter() }

  get usuarioLogado(): string | undefined {
    return this.loginService.usuarioLogado;
  }



  hideFooter() {
    //hide footer when input box is on focus
    $(document).on('focus', 'input, textarea', function() {
      $("#footer").hide();
    });

//show footer when input is NOT on focus
    $(document).on('blur', 'input, textarea', function() {
      $("#footer").show();
    });
  }


}
