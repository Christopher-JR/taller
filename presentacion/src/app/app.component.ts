import { Component, signal, computed, inject, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './components/side-nav/side-nav.component';
//import { AuthService } from './helpers/services/auth.service';
import { AuthService } from './shared/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './helpers/models/user';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FrmPasswComponent } from './components/forms/frm-passw/frm-passw.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, 
    MatIconModule, MatSidenavModule, SideNavComponent, CommonModule, MatMenuModule, MatDividerModule, RouterLink, MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  authSrv = inject(AuthService);
  dialog = inject(MatDialog);
  usuario$ !: Observable<User>
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed () ? '65px' : '250px');

  @HostListener("window:beforeunload", ["$event"]) unloadHandler() {
    this.logOut();
  }

  logOut(){
    this.authSrv.logout();
  }

  ngOnInit(): void {
    this.usuario$ = this.authSrv.usrActual;
  }

  chagePasswForm(){
    this.dialog.open(FrmPasswComponent, {
      width : '450px'
    });
  }
}
