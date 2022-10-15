import { Component, OnInit } from '@angular/core';
import {Usuario} from "../shared/models";
import {LoginService} from "../auth/services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get usuarioLogado(): string | undefined {
    return this.loginService.usuarioLogado;
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      this.router.navigate( ["/login"]);
    }, (error) => {
    })
  }

}
