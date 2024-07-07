import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, retry, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
//import { Token } from '../models/interfaces';
import { Token } from '../../helpers/models/interfaces';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
//import { User } from '../models/user';
import { User } from '../../helpers/models/user';



const _SERVER = environment.servidor;
const LIMITE_REFRESH = 20;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private srvToken = inject(TokenService);
  private router = inject(Router);

  private usrActualSubject = new BehaviorSubject<User>(new User());

  public usrActual = this.usrActualSubject.asObservable();


  private readonly http = inject(HttpClient);
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'Application/json'
    })
  };
  
  constructor() { }

  public get valorUsrActual() : User {
    return this.usrActualSubject.value;
  }

  public login(datos : {usuario : '', passw : ''}) : Observable <Token>{ 
    return this.http.post<Token>(`${_SERVER}/api/auth/iniciar`, datos)
    .pipe(
      retry(1),
      tap((tokens) => {
        //Login guardar tokens
        this.doLogin(tokens);
        this.router.navigate(['/home']);
        console.log(tokens);
      }),
      map(() => true),
      catchError((error) => {
        return of(error.status)
      })
    )
    ;
  }
  
  public logout (){
    if(this.isLogged()){
      this.http
      .patch(`${_SERVER}/api/auth/cerrar/${this.valorUsrActual.idUsuario}`, {})
      .subscribe();
      this.doLogout();
    }
  }

  private doLogin(tokens : Token){
    this.srvToken.setTokens(tokens);
    //Compartir datos de sesion a toda la app
    this.usrActualSubject.next(this.getUserActual())
  }

  //Cerrar sesion
  private doLogout () {
    if(this.srvToken.token){
      this.srvToken.eliminarTokens();
    }
    this.usrActualSubject.next(this.getUserActual());
    this.router.navigate(['/login']);
  }

  public isLogged () : boolean {
    return !!this.srvToken.token && !this.srvToken.jwtTokenExp();
  }

  //Se obtienen los datos del que esta logueado
  getUserActual() : User{
    if(!this.srvToken.token){
      return new User();
    }
    const tokenD = this.srvToken.decodeToken();
    return {idUsuario : tokenD.sub, nombre : tokenD.nom, rol : tokenD.rol}
   
  }

  public verificarRefresh () : boolean {
    if(this.isLogged()){
      const tiempo = this.srvToken.tiempoExpToken();
      if(tiempo <= 0){
        this.logout();
        return false;
      }
      if(tiempo > 0 && tiempo <= LIMITE_REFRESH){
        this.srvToken.refreshTokens();
      }
      return true;
    }else {
      this.logout();
      return false;
    }
  }
}
