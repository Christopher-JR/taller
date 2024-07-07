import { Component, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { passwStrenthValidator } from '../../../shared/validators/passw-strength';
import { notEqualsValidator } from '../../../shared/validators/passw-equals';

@Component({
  selector: 'app-frm-passw',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule,
    MatIconModule
  ],
  templateUrl: './frm-passw.component.html',
  styleUrl: './frm-passw.component.scss'
})
export class FrmPasswComponent {
  frmPasswChange : FormGroup;
  public passwNoValido : boolean = false;
  private builder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<FrmPasswComponent>)
  private srvUsuario = inject(UsuarioService);

  constructor () {
    this.frmPasswChange = this.builder.group({
      passw : ['', [Validators.required]],
      passwN : ['', [Validators.required, Validators.minLength(8), passwStrenthValidator()]],
      passwR : ['']
    },
    { validator : notEqualsValidator() } as AbstractControlOptions
  );
  }

  get F(){
    return this.frmPasswChange.controls;
  }

  cambiarPass(){
    this.srvUsuario.savePassw(
      {
        passw : this.frmPasswChange.value.passw,
        passwN : this.frmPasswChange.value.passwN
      }).subscribe(
        (res) => {
          this.passwNoValido = res === 401;
          if (res === true) {
            this.dialogRef.close();
          }
          console.log(res);          
        }
      );
  }
}
