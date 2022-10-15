import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { Login } from 'src/app/shared/models/login.model';
import { HttpClient, HttpHeaders} from '@angular/common/http'

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

  login (login: Login): Observable<Usuario | null> {
    let dados = {
      'email': login.email,
      'password': login.password,
      'remember' : login.remember,
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
    delete localStorage[LS_CHAVE];
    return this.httpClient.post<Usuario>(this.BASE_URL+'logout','', this.httpOptions);
  }
}
