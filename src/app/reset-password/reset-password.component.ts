import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../auth/services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Login} from "../shared/models";
import {LoginComponent} from "../auth/login/login.component";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('formReset') formReset! : NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private loginComponent: LoginComponent
  ) {
    if (this.loginService.usuarioLogado) {
      this.router.navigate( ["/home"]);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.message = params['error'];
    })
  }

  resetPassword():void {
    this.loading = true;
    if (this.formReset.form.valid) {
      this.loginService.resetPassword(this.login).subscribe( (response) => {

      }, (error) => {
      })
      this.loading = false;
      const navigationExtras = {state: {data: 'Vamos procurar pelo seu e-mail e então enviaremos um e-mail de redefinição de senha'}};
      this.router.navigate( ["/login"], navigationExtras);
    }
  }


}
