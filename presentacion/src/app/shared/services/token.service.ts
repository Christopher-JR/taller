import { Injectable, inject } from '@angular/core';
//import { Token } from '../models/interfaces';
import { Token } from '../../helpers/models/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private refrescando = false;
  private JWT_TOKEN = 'JWT_TOKEN';
  private REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly http = inject(HttpClient);

  constructor() { }

  //Guardar tokens
  setTokens(tokens : Token) : void {
    this.setToken(tokens.token);
    this.setRefreshToken(tokens.tkRef)
  }
  //Se almacena en localStorage
  private setToken(token : string) : void {
    localStorage.setItem(this.JWT_TOKEN, token)
  }

  private setRefreshToken(token : string) : void {
    localStorage.setItem(this.REFRESH_TOKEN, token)
  }

  //Recuperar tokens
  get token() : any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  get refreshToken() : any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  //Eliminar tokens
  eliminarTokens () {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  public decodeToken() : any {
    const helper = new JwtHelperService()
    return helper.decodeToken(this.token);
  }

  public jwtTokenExp () : any {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.token);
  }

  public tiempoExpToken () : any {
    return this.decodeToken().exp - (Date.now() / 1000);
  }

  public refreshTokens () {
    if(!this.refrescando){
      this.refrescando = true;
      return this.http.patch<Token>(`${environment.servidor}/api/auth/refresh`,
        {
          idUsuario : (this.decodeToken().sub),
          tkRef : this.refreshToken
        })
        .subscribe(
          tokens => {
            this.setTokens(tokens);
            this.refrescando = false;
          }
        )
    }
    return false;    
  }
}
