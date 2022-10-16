import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { Login } from 'src/app/shared/models/login.model';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  BASE_URL = "https://consumo-familiar-api.tech/api/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public get usuarioLogado(): string | undefined {
    let usu = localStorage[LS_CHAVE];
    return (usu ? usu : null);
  }

  public set usuarioLogado(usuario: string | undefined) {
    localStorage[LS_CHAVE] = usuario;
  }

  public deleteUsuariologado(){
    delete localStorage[LS_CHAVE];
  }

  login (login: Login): Observable<Usuario | null> {
    let dados = {
      'email': login.email,
      'password': login.password,
      'device_name': 'angular'
    };
    return this.httpClient.post<Usuario>(this.BASE_URL+'auth', dados, this.httpOptions);

  }

  logout(): Observable<Usuario | null> {
    let usu = this.usuarioLogado;
    if(usu != null){
      this.httpOptions.headers =
        this.httpOptions.headers.set('Authorization', "Bearer " +usu);
    }

    return this.httpClient.post<Usuario>(this.BASE_URL+'logout','', this.httpOptions);
  }

  resetPassword(login: Login): Observable<any> {
    let email = login.email?.trim();
    let dados = {
      'email' : email
    }
    return this.httpClient.post<any>(this.BASE_URL+'forgot-password', dados, this.httpOptions)
  }
}
