import { Component, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'

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

export class SideNavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val : boolean){
    this.sideNavCollapsed.set(val);
  }
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
}
