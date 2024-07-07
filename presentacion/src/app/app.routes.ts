import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { Role } from './helpers/models/role';
import { Error403Component } from './components/error403/error403.component';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
    { path : '', redirectTo: 'home', pathMatch : 'full'},
    { path : 'home', component : HomeComponent, canActivate : [authGuard] },
    { path : 'login', component : LoginComponent, canActivate : [loginGuard]},
    { path : 'clientes', component : ClienteComponent,
        canActivate : [authGuard],
        data : {roles : [Role.Admin, Role.Oficinista, Role.Cliente]}
    },
    { path : 'tecnicos', component : TecnicoComponent},
    { path : 'error403', component : Error403Component}
];
