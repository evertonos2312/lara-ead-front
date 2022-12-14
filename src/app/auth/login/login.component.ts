import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin! : NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;
  success!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const navigation = this.router.getCurrentNavigation();
    if(navigation != null){
      if(navigation.extras.state != null){
        const state = navigation.extras.state as {data: string};
        this.success = state.data;
      }
    }

    if (this.loginService.usuarioLogado) {
      this.router.navigate( ["/home"]);
    } else {
      this.router.navigate( ["/login"]);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.message = params['error'];
    })
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login)
        .subscribe((usu) => {
        if (usu != null){
          this.loginService.usuarioLogado = usu.token;
          this.loading = false;
          this.router.navigate( ["/home"]);
        } else {
          this.loading = false;
          this.message = "Credenciais inválidas.";
        }
      },
          () => {
          this.loading = false;
          this.message = "Credenciais inválidas.";
          }
      )
    }
  }



}
