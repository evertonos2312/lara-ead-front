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
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
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

  logout() {

    delete localStorage[LS_CHAVE];
  }
}
