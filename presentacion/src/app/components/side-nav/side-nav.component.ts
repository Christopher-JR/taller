import { Component, signal, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'
//import { AuthService } from '../../helpers/services/auth.service';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../helpers/models/user';

type MenuItem = {
  icon : string;
  label : string;
  route : string;
}
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})

export class SideNavComponent implements OnInit{
  nombre : string = '';
  usuario$ !: Observable<User>;
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val : boolean){
    this.sideNavCollapsed.set(val);
  }

  srvAuth = inject(AuthService);

  menuItems = signal<MenuItem[]>([
    {
      icon : 'home',
      label : 'Inicio',
      route : 'home'
    },
    {
      icon : 'people',
      label : 'Clientes',
      route : 'clientes'
    },
    {
      icon : 'engineering',
      label : 'Tecnicos',
      route : 'tecnicos'
    },
  ]);

  ngOnInit(): void {
    this.usuario$ = this.srvAuth.usrActual;
    /*this.srvAuth.usrActual.subscribe((res) => {
      this.nombre = res.nombre;
    });*/
  }
}
