import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';

export const routes: Routes = [
    {path : '', redirectTo: 'home', pathMatch : 'full'},
    { path : 'home', component : HomeComponent },
    { path : 'clientes', component : ClienteComponent},
    { path : 'tecnicos', component : TecnicoComponent}
];
