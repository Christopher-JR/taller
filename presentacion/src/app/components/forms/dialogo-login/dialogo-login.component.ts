import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
//import { AuthService } from '../../../helpers/services/auth.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-dialogo-login',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    MatIconModule
  ],
  templateUrl: './dialogo-login.component.html',
  styleUrl: './dialogo-login.component.scss'
})
export class DialogoLoginComponent {
  readonly dialogRef = inject(MatDialogRef<DialogoLoginComponent>);
  frmLogin : FormGroup;
  private builder = inject(FormBuilder);
  private srvAuth = inject(AuthService);

  errorLogin : boolean = false;

  constructor(){
    this.frmLogin = this.builder.group({
      id : (0),
      usuario : (''),
      passw : ('')
    });
  }

  get F(){
    return this.frmLogin.controls;
  }

  logear(){
    console.log(this.frmLogin.value);
    this.srvAuth.login(this.frmLogin.value)
    .subscribe((res : any) => {
      this.errorLogin = !res || res === 401;            
      if(!this.errorLogin){
        this.dialogRef.close();
      }
      console.log(res)
    });
  }
}
