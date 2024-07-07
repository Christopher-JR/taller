import { Component, OnInit, inject } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogoLoginComponent } from '../forms/dialogo-login/dialogo-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDialogModule, DialogoLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.dialog.open(DialogoLoginComponent, {
      width : '450px'
    });
  }
}
