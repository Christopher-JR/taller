import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoCliente } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly http = inject(HttpClient);

  constructor() { }

  getAll() : Observable <TipoCliente[]>{
    return this.http.get<any>("http://localhost:8000/cliente/read");
  }
}
